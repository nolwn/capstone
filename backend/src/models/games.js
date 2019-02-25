const redis = require("redis");

const knex = require("../../db");
const { jwtAsPromised, redisAsPromised, getAndCache, io } = require("../utils");

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
  return redisAsPromised.hgetall(GAME_ID + game_id)
    .then(result => {
      if(!result) {
        return getAndCache(game_id)
          .then(result =>
            redisAsPromised.hgetall(GAME_ID + game_id)
          )
          .then(result =>
            ({
              ...result,
              position: JSON.parse(result.position),
              turns: result.turns ? JSON.parse(result.turns) : null
            }));
      } else {
        return {
          ...result,
          position: JSON.parse(result.position),
          turns: result.turns ? JSON.parse(result.turns) : null
        };
      }
  });
};

// Start a new game, cache in Redis, return a new JWT token
// TODO: add user who calls this route to game.
const createGame = ({ player_white, player_black }, claim) => {
  const color = player_white ? "white" : "black";
  let newClaim;
  let gameId;

  return knex("games")
    .insert({ player_white, player_black })
    .returning("*")
    .then(storedGame => gameId = storedGame[0].id)
    .then(_ => getAndCache(gameId))
    .then(_ => emitUpdate(gameId))
    .then(cachedGame => generateNewClaim(gameId, claim, color))
    .then(resultClaim => {
      newClaim = resultClaim
    })
    .then(_ => ({ id: gameId, claim: newClaim }))
    // .then(_ => addPlayerToRedis(gameId, claim.id, color))
    // .then(_ => console.log(id: gameId, username: newClaim));
}

// Join a game, cache in Redis, return a new JWT token
const joinGame = (game_id, game, claim) => {
  const whereObject = { id: game_id };
  whereObject[`player_${game.color}`] = null;
  return knex("games")
    .update(`player_${game.color}`, claim.id)
    .where({ id: game_id })
    .whereNull(`player_${game.color}`)
    .returning("*")
    .then(([ data ]) => {
      if (!data) throw { status: 400, message: "Unauthorized" }
    })
    .then(_ => startGame(game_id))
    .then(_ => addPlayerToRedis(game_id, claim.id, claim.username, game.color))
    .then(_ => emitUpdate(game_id))
    .then(_ => generateNewClaim(game_id, claim, game.color));
}

/**********************
 *  HELPER FUNCTIONS  *
 **********************/

const startGame = (game_id) =>
  knex("games")
    .where({ id: game_id })
    .update("started_at", knex.fn.now())
    .returning("*");

const generateNewClaim = (game_id, claim, color) => {
  const newClaim = { ...claim };

  newClaim.games[`game-${game_id}`] = color;

  return newClaim;
}

const addPlayerToRedis = (gameId, playerId, username, color) => {
    return redisAsPromised.hgetall(GAME_ID + gameId)
      .then(result => {
        if (!result) {
          return getAndCache(gameId)

        } else {

          redisAsPromised.hset(GAME_ID + gameId, color, playerId);
        }

        return result
      })
      .then(result => {
        const colorCap = color[0].toUpperCase() + color.slice(1);
        colorCap[0] = colorCap[0].toUpperCase();
        return redisAsPromised.hset(
          GAME_ID + gameId,
          `username${colorCap}`,
          username
        );
      })
}

const emitUpdate = gameId => {
  console.log("Emit to lobby!");
  io.to("Lobby").emit("Lobby Update", "");
  console.log("Emit to Game " + gameId + "!");
  io.to("Game " + gameId).emit("update", "");
}


module.exports = { getPendingGame, getPendingGames, createGame, joinGame };
