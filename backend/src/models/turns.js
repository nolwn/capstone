const chess = require("chess-rules");
const knex = require("../../db");

const {
  redisAsPromised,
  getAndCache,
  cacheGameState
} = require("../utils");
const { GAME_ID } = require("../utils");

const whiteTurn = (game_id, move) => {
  return redisAsPromised.hget(GAME_ID + game_id, "position")
    .then(result => JSON.parse(result))
    .then(result => verifyOrFindGame(game_id, result))
    .then(result => validateMove(result, move))
    .then(result => cacheGameState(game_id, result))
    .then(result => cacheNewPosition(game_id, result))
    .then(_ => cacheTurns(game_id, move));

}

const blackTurn = move => {

}

/*
 *  HELPER FUNCTIONS
 */
 const verifyOrFindGame = (game_id, state) => {
   if (!state) {
     return getAndCache(game_id);

   } else {
     return state;
   }
 }

const validateMove = (state, move) => {
  const position = state;
  const possibleMoves = chess.getAvailableMoves(position);

  if (possibleMoves.find(el =>
    el.src === move.src && el.dst === move.dst
  )) {
    return chess.applyMove(position, move);
  } else {
    throw { status: 400, message: "That move is not valid" };
  }
}

const cacheNewPosition = (game_id, state) =>
  redisAsPromised.hset(GAME_ID + game_id, "position", JSON.stringify(state))

const cacheTurns = (game_id, move) =>
  redisAsPromised.hget(GAME_ID + game_id, "turns")
    .then(turns => {
      let parsedTurns;
      if (!turns) {
        parsedTurns = [];

      } else {
        parsedTurns = JSON.parse(turns);
      }

      return redisAsPromised.hset(
        GAME_ID + game_id,
        "turns",
        JSON.stringify([ ...parsedTurns, move ])
      );
    });

module.exports = { whiteTurn, blackTurn };
