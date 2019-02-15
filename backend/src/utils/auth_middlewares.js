const { jwtAsPromised } = require("./jwt_utils");
const { redisAsPromised } = require("./redis_utils");

const secret = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("no headers")

    next({ status: 400, message: "Bad Request" });

  } else {
    const [_, token] = req.headers.authorization.split(" ");
    console.log("THING")

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
      console.console.log();("err")
  }
}

const isAuthorized = (req, res, next) => {

};

module.exports = { isAuthenticated }
