const redis = require("redis");

const knex = require("../../db");
const { jwtAsPromised, redisAsPromised, getAndCache } = require("../utils");

const GAME_ID = "game_id_";

/**********************
 *  EXPORT FUNCTIONS  *
 **********************/

// Return games that have not started yet
const getPendingGames = () => {
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
const getPendingGame = game_id => {
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
const createGame = ({ player_white, player_black }, claim) => {
  if (!(player_white ? !player_black : player_black)) { // XOR
    throw { status: 400, message: "Select one, and only one, color to play." }
  }

  const color = player_white ? "white" : "black";
  let token;
  let gameId;

  return knex("games")
    .insert({ player_white, player_black })
    .returning("*")
    .then(storedGame => gameId = storedGame[0].id)
    .then(_ => getAndCache(gameId))
    .then(cachedGame => generateNewToken(cachedGame, claim, color))
    .then(newToken => token = newToken)
    .then(_ => addPlayerToRedis(gameId, claim.id, color))
    .then(_ => token);
}

// Join a game, cache in Redis, return a new JWT token
const joinGame = (game_id, game, claim) => {
  const whereObject = { id: game_id };
  whereObject[`player_${game.color}`] = null;
  return knex("games")
    .update(`player_${game.color}`, claim.id)
    .where(whereObject)
    .returning("*")
    .then(storedGame => startGame(storedGame[0].id))
    .then(storedGame => getAndCache(storedGame[0].id))
    .then(cachedGame => generateNewToken(cachedGame, claim, game.color));
}

/***********************
 *  HELPER FUNCTIONS  *
 ***********************/

const startGame = (game_id) =>
  knex("games")
    .where({ id: game_id })
    .update("started_at", knex.fn.now())
    .returning("*");

const generateNewToken = (game, claim, color) => {
  const newClaim = { ...claim };

  newClaim.games[`game-${game.id}`] = color;

  return newClaim;
}

const addPlayerToRedis = (gameId, playerId, color) =>
  redisAsPromised.set(`${color}_game_id_${gameId}`, playerId)


module.exports = { getPendingGame, getPendingGames, createGame, joinGame };
