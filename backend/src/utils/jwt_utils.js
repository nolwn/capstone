const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtAsPromised = {
  verify: promisify(jwt.verify).bind(jwt),
  sign: promisify(jwt.sign).bind(jwt)
}

module.exports = { jwtAsPromised };
