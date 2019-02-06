const jwt = require("jsonwebtoken");
const { promisify } = require("utils");

const jwtAsPromised = {
  verify: promisify(jwt.verify).bind(jwt),
  sign: promisify(jwt.sign).bind(jwt)
}

module.exports = { jwtAsPromised };
