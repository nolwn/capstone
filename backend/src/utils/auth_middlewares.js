const { jwtAsPromised } = require("./jwt-utils");

const secret = process.env.SECRET;

const isAuthenticated = (req, res, next) => {
  const [_, token] = req.headers.authorization.split(" ");

  jwtAsPromised.verify(token, secret)
    .then(result => {
      req.claim = result;

      next();
    })
    .catch(next);
}



module.exports = { isAuthenticated }
