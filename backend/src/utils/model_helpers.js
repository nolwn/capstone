const chess = require ("chess-rules");
const { redisAsPromised } = require("./redis_utils")
const knex = require("../../db");

const GAME_ID = "game_id_";
const TURN_ID = "_turn_id_";

const getAndCache = game_id => {
  return knex("games")
    .where("games.id", game_id)
    .first()
    .then(result => {
      if(!result) {
        throw { status: 404, message: "Game not found" };

      } else {
        const position = chess.fenToPosition(result["previous_fen"]);
        return redisAsPromised.hset(
          GAME_ID + game_id,
          "position",
          JSON.stringify(position)
        );
      }
    })
    .then(result => redisAsPromised.hget(GAME_ID + game_id, "position"))
    .then(result => JSON.parse(result))
    .then(cachedGame => cacheGameState(game_id, cachedGame));
}

const cacheGameState = (gameId, cachedGame) => {
  console.log(gameId, cachedGame)
  const turn = cachedGame.turn;
  const status = chess.getGameStatus(cachedGame);

  return redisAsPromised.hmset(GAME_ID + gameId, "turn", turn, "status", status)
    .then(_ => cachedGame);
}

module.exports = { GAME_ID, TURN_ID, getAndCache, cacheGameState };
