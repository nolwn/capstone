const { redisAsPromised } = require("./redis_utils");
const { isAuthenticated, isPlayer, isPlayerToken, isTurn } = require("./auth_middlewares");
const { jwtAsPromised } = require("./jwt_utils");
const { http, app, io } = require("./server");
const {
  GAME_ID,
  getAndCache,
  cacheGameState,
  getGameTurn
} = require("./model_helpers");

module.exports = {
  redisAsPromised,
  isAuthenticated,
  isPlayer,
  isPlayerToken,
  isTurn,
  jwtAsPromised,
  getAndCache,
  cacheGameState,
  getGameTurn,
  app,
  http,
  io,
  GAME_ID
};
