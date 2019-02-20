const { jwtAsPromised } = require("./jwt_utils");
const { redisAsPromised } = require("./redis_utils");
const { GAME_ID, getAndCache, getGameTurn } = require("./model_helpers");

const secret = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
  console.log(secret)
  if (!req.headers.authorization) {
    next({ status: 400, message: "Bad Request" });

  } else {
    const [_, token] = req.headers.authorization.split(" ");

    return jwtAsPromised.verify(token, secret)
      .then(result => {

        req.claim = result;

        next();
      })
      .catch(next);
  }
};

const isPlayer = async (req, res, next) => {
  const gameId = req.params.game_id;
  const userId = req.claim.id;

  return redisAsPromised.hmget(GAME_ID + gameId, "white", "black")
    .then(result => verifyOrCache(gameId, result))
    .then(players => {
      if (!(players.findIndex(id => userId == id) > -1)) {
        next({ status: 400, message: "Unauthorized" });
      }
    })
    .then(next)
    .catch(next);
};

const isPlayerToken = (req, res, next) => {
  const claim = req.claim;
  const gameId = req.params.game_id;

  if (claim.games[`game-${gameId}`]) {
    next();
  } else {
    next({ status: 400, message: "Unauthorized" });
  }
}

const isTurn = (req, res, next) => {
  const gameId = req.params.game_id;
  const userColor = req.claim.games[`game-${gameId}`][0]

  return getGameTurn(gameId)
    .then(gameTurn => {
      if (gameTurn !== userColor) {
        throw { status: 400, message: "Unauthorized" };
      }
    })
    .then(next)
    .catch(next);
};

/***************
 *  SOCKET IO  *
 ***************/

const socketAuthenticated = async (socket, next) => {

}

/***********************
 *  HELPERS FUNCTIONS  *
 ***********************/

const verifyOrCache = (gameId, players) => {
  if (players[0] !== null && players[1] !== null) {
    return getAndCache(gameId)
      .then(_ => redisAsPromised.hmget(GAME_ID + gameId, "white", "black"));

  } else {
    return players;
  }
}

module.exports = { isAuthenticated, isPlayer, isPlayerToken, isTurn }
