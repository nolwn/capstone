const chess = require ("chess-rules");
const { redisAsPromised } = require("./redis_utils")
const knex = require("../../db");

const GAME_ID = "game_id_";
const TURN_ID = "_turn_id_";

const getAndCache = game_id => {
  return knex("games")
    .where("games.id", game_id)
    .leftJoin("users AS white", "white.id", "player_white")
    .leftJoin("users AS black", "black.id", "player_black")
    .select(
      "games.id",
      "games.player_white",
      "games.player_black",
      "games.previous_fen",
      "white.username AS usernameWhite",
      "black.username AS usernameBlack"
    )
    .first()
    .then(result => {
      if(!result) {
        throw { status: 404, message: "Game not found" };

      } else {
        return cacheGameFromDB(result)
      }
    })
    .then(result => redisAsPromised.hget(GAME_ID + game_id, "position"))
    .then(result => JSON.parse(result))
    .then(cachedGame => cacheGameState(game_id, cachedGame));
}

const cacheGameFromDB = result => {
  const position = chess.fenToPosition(result["previous_fen"]);
  return redisAsPromised.hset(
    GAME_ID + result.id,
    "position",
    JSON.stringify(position),
    "white",
    result.player_white,
    "black",
    result.player_black,
    "usernameWhite",
    result.usernameWhite,
    "usernameBlack",
    result.usernameBlack
  );
}

const cacheGameState = (gameId, cachedGame) => {
  const turn = cachedGame.turn.toLowerCase();
  const status = chess.getGameStatus(cachedGame);

  return redisAsPromised.hmset(
      GAME_ID + gameId,
      "turn",
      turn,
      "status",
      status
    )
    .then(_ => cachedGame);
}

const getGameTurn = gameId => {
  return redisAsPromised.hget(GAME_ID + gameId, "turn")
    .then(gameTurn => {
      if (!gameTurn) {
        getAndCache(gameId)
          .then(redisAsPromised.hget(GAME_ID + gameId, "turn"));
      } else {
        return gameTurn;
      }
    })
}

module.exports = { GAME_ID, TURN_ID, getAndCache, cacheGameState, getGameTurn };
