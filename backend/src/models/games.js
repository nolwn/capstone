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
    .leftJoin("users as playerWhite", "playerWhite.id", "games.player_white")
    .leftJoin("users as playerBlack", "playerBlack.id", "games.player_black")
    .where("started_at", null)
    .select(
      "games.id",
      "playerWhite.username as playerWhite",
      "playerBlack.username as playerBlack"
    );
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

// Start a new game, cache in Redis, return a new JWT token
// TODO: add user who calls this route to game.
const createGame = (game, claim) => {
  return knex("games")
    .insert(game)
    .returning("*")
    .then(storedGame => getAndCache(storedGame[0].id))
    .then(cachedGame => addHostToGame(cachedGame, claim))
    .then(cachedGame => generateNewToken(cachedGame, claim, "white"));
}

// Join a game, cache in Redis, return a new JWT token
const joinGame = (game_id, game, claim) => {
  const whereObject = { id: game_id };
  whereObject[`player_${game.color}`] = null;
  return knex("games")
    .update(`player_${game.color}`, claim.id)
    .where(whereObject)
    .returning("*")
    .then(storedGame => getAndCache(storedGame[0].id))
    .then(cachedGame => generateNewToken(cachedGame, claim, game.color));
}

/***********************
 *  PRIVATE FUNCTIONS  *
 ***********************/

// TODO: do I need to retrieve the game from the db? Why? It's slower...
const getAndCache = game_id => {
  console.log(game_id);
  return knex("games")
    .where("games.id", game_id)
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

const addHostToGame = (game, host) => {
  const newGame = { ...game };

  newGame.host = host.username;
  newGame.guest = null;

  return newGame;
}

const generateNewToken = (game, claim, color) => {
  const newClaim = { ...claim };

  newClaim.games[`game-${game.id}`] = color;

  return newClaim;
}

module.exports = { getActiveGame, getActiveGames, createGame, joinGame };
