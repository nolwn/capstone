const { jwtAsPromised } = require("./jwt_utils");
const { redisAsPromised } = require("./redis_utils");
const { GAME_ID } = require("./model_helpers");

const secret = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("no headers")

    next({ status: 400, message: "Bad Request" });

  } else {
    const [_, token] = req.headers.authorization.split(" ");

    return jwtAsPromised.verify(token, secret)
      .then(result => {
        console.log(result)
        req.claim = result;

        next();
      })
      .catch(err => {
        console.log("err")
        next(err)
      });
  }
};

const isPlayer = async (req, res, next) => {
  const gameId = req.params.game_id;
  const userId = req.claim.id;

  return redisAsPromised.hmget(GAME_ID + gameId, "white", "black")
    .then(players => {
      if (players.findIndex(id => userId === id) > -1) {
        next({ status: 400, message: "Unauthorized" });
      }
    })
    .then(next);

  console.log("game: ", game);

  next();
};

const isTurn = (req, res, next) => {

};

module.exports = { isAuthenticated, isPlayer, isTurn }
