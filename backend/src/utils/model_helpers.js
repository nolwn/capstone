const chess = require ("chess-rules");
const { redisAsPromised } = require("./redis_utils")
const knex = require("../../db");

const GAME_ID = "game_id_";
const TURN_ID = "_turn_id_";

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

        const position = chess.fenToPosition(result["previous_fen"]);
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

module.exports = { GAME_ID, TURN_ID, getAndCache };
