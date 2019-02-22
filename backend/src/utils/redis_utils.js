const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient();

const redisAsPromised = {
  get: promisify(client.get).bind(client),
  set: promisify(client.set).bind(client),
  hset: promisify(client.hset).bind(client),
  hget: promisify(client.hget).bind(client),
  hmset: promisify(client.hmset).bind(client),
  hmget: promisify(client.hmget).bind(client),
  hgetall: promisify(client.hgetall).bind(client),
  del: promisify(client.del).bind(client)
};

module.exports = { redisAsPromised };
