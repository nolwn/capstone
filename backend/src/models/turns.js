const chess = require("chess-rules");
const knex = require("../../db");
const { io } = require("../utils");

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
    .then(_ => cacheTurns(game_id, move))
    .then(_ => detectFinished(game_id))
    .then(_ => emitUpdate(game_id));
}

const blackTurn = move => {

}

/*
 *  HELPER FUNCTIONS
 */

const detectFinished = (gameId) => {
  return redisAsPromised.hget(GAME_ID + gameId, "position")
    .then(position => {
      position = JSON.parse(position);
      if (chess.getGameStatus(position) !== "OPEN") {
        return storeGame(gameId, position)
      }
    });
}

const emitUpdate = gameId => {
  const room = `Game ${gameId}`;

  console.log("Update sent to " + room);
  io.to(room).emit("update", "🕹");
}

const storeGame = (gameId, position) => {
  return knex("games")
    .update({
      previous_fen: chess.positionToFen(position),
      winner: chess.getGameStatus(position),
      ended_at: new Date().toISOString()
    })
    .where("id", gameId)
    .then(_ => {
      return redisAsPromised.hget(GAME_ID + gameId, "turns")
        .then(turns => {
          const turnsToInsert = [];
          let replay = chess.getInitialPosition();

          turns = JSON.parse(turns);

          for (let i = 0; i < turns.length; i += 2) {
            let turnToInsert = {
              game_id: gameId,
              turn: Math.floor(i / 2 + 1),
              pgn_white: chess.moveToPgn(replay, turns[i]),
            }

            replay = chess.applyMove(replay, turns[i]);

            let blackTurn = "...";

            if (turns[i + 1]) {
              blackTurn = chess.moveToPgn(replay, turns[i + 1])

              replay = chess.applyMove(replay, turns[i + 1]);
            }

            turnToInsert.pgn_black = blackTurn;


            turnsToInsert.push(turnToInsert);
          }

          return knex("turns")
            .insert(turnsToInsert)
        });
    })
    // .then(_ => flushGameFromRedis(gameId));
}

const flushGameFromRedis = gameId => {
  return redisAsPromised.del(GAME_ID + gameId);
}

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
