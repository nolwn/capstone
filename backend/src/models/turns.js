const chess = require("chess-rules");
const knex = require("../../db");

const { redisAsPromised, getAndCache } = require("../utils");
const { GAME_ID } = require("../utils");

const whiteTurn = (game_id, move) => {
  redisAsPromised.get(GAME_ID + game_id)
    .then(result => verifyOrFindGame(result))
    .then(result => validateMove(result, move))
    .then(result => cacheNewState(game_id, result))
    .then(_ => cacheTurns(game_id, move));

}

const blackTurn = move => {

}

/*
 *  HELPER FUNCTIONS
 */

const verifyOrFindGame = state => {
  if (!state) {
    return getAndCache(game_id);

  } else {
    return state;
  }
}

const validateMove = (state, move) => {
  const position = JSON.parse(result);
  const possibleMoves = chess.getMoves(position);

  if (possibleMoves.find(el =>
    el.src === move.src && el.dst === move.dst
  )) {
    return chess.applyMove(move);
  } else {
    throw { status: 400, message: "That move is not valid" };
  }
}

const cacheNewState = (game_id, state) =>
  redisAsPromised.set(GAME_ID + game_id, JSON.stringify(state))

const cacheTurns = (game_id, move) =>
  redisAsPromised.get("turn_" + GAME_ID + game_id)
    .then(turns => {
      let parsedTurns;
      if (!turns) {
        parsedTurns = [];

      } else {
        parsedTurns = JSON.parse(turns);
      }

      redisAsPromised.set("turn_" + GAME_ID + game_id, [ ...parsedTurns, move ])
    })

module.exports = { whiteTurn, blackTurn };
