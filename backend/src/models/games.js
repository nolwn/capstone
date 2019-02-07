const chessRules = require("chess-rules");
const redis = require("redis");

const knex = require("../../db");
const { jwtAsPromised } = require("../utils");
const { redisAsPromised } = require("../utils");

const GAME_ID = "game_id:";

/**********************
 *  EXPORT FUNCTIONS  *
 **********************/

// Return games that have not started yet
const getActiveGames = () => {
  return knex("games")
    .where("started_at", null);
}

// Return an active game state
const getActiveGame = (game_id) => {
  return redisAsPromised.get(GAME_ID + game_id)
    .then(result => {
      if(!result) {
        return getAndCache(game_id);

      } else {
        console.log("game already cached!");
        return JSON.parse(result);
      }
  });
};

// Start a new game
// TODO: add user who calls this route to game.
const createGame = (game, claim) => {
  return knex("games")
    .insert(game)
    .returning("*")
    .then(storedGame => getAndCache(storedGame[0].id))
    .then(cachedGame => addPlayerToGame(cachedGame, claim))
    .then(cachedGame => generateNewToken(cachedGame, claim));
}

/***********************
 *  PRIVATE FUNCTIONS  *
 ***********************/

const getAndCache = game_id => {
  console.log(game_id);
  return knex("games")
    .where("id", game_id)
    .first()
    .then(result => {
      if(!result) {
        throw { status: 404, message: "Game not found" };

      } else {
        console.log("caching...");

        const position = chessRules.fenToPosition(result["previous_fen"]);
        redisAsPromised.set(GAME_ID + game_id, JSON.stringify(position));

        return redisAsPromised.get(GAME_ID + game_id);
      }
    })
    .then(result => JSON.parse(result))
    .then(cachedGame => {
      cachedGame.id = game_id;
      return cachedGame;
    });
}

const addPlayerToGame = (game, host) => {
  const newGame = { ...game };

  newGame.host = host.id;
  newGame.guest = null;

  return newGame;
}

const generateNewToken = (game, claim) => {
  const newClaim = { ...claim };

  console.log(newClaim);

  newClaim.games[`game-${game.id}`] = "host";

  return newClaim;
}

module.exports = { getActiveGame, getActiveGames, createGame };
