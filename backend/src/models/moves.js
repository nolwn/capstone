const chessRules = require("chess-rules");
const redis = require("redis");
const knex = require("../../db");

const { redisAsPromised } = require("../utils");

const GAME_ID = "game_id:";

/**********************
 *  EXPORT FUNCTIONS  *
 **********************/

const getGame = (game_id) => {
  return redisAsPromised.get(GAME_ID + game_id)
    .then(result => {
      if(!result) {
        return getAndCache(game_id)

      } else {
        console.log("game already cached!")
        return JSON.parse(result)
      }
  });
};

/***********************
 *  PRIVATE FUNCTIONS  *
 ***********************/

const getAndCache = game_id => {
  return knex("games")
    .where("id", game_id)
    .first()
    .then(result => {
      if(!result) {
        throw "Game not found";

      } else {
        console.log("caching...")
        const position = chessRules.fenToPosition(result["previous_fen"]);
        redisAsPromised.set(GAME_ID + game_id, JSON.stringify(position));
        return redisAsPromised.get(GAME_ID + game_id);
      }
    })
    .then(result => JSON.parse(result))
}

module.exports = { getGame };
