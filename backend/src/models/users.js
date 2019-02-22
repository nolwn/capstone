const bcrypt = require("bcrypt")

const knex = require("../../db");
const { redisAsPromised, GAME_ID } = require("../utils");

const getUserGames = userId =>
  knex("games")
    .leftJoin("users AS white", "player_white", "white.id")
    .leftJoin("users AS black", "player_black", "black.id")
    .where({ ended_at: null, player_white: userId })
    .orWhere({ ended_at: null, player_black: userId })
    .select(
      "games.id",
      "white.username AS white",
      "black.username AS black",
      "games.updated_at",
      "games.previous_fen"
    )
    .then(games => getGamesStatusFromFens(games))
    .then(games => getGamesStatusFromRedis(games));

const createUser = body => {
  if (!(body.username && body.password )) {
    throw { error: 400, message: "Supply both a username and password." }
  }

  return knex("users")
    .where({ username: body.username })
    .then(([ user ]) => {
      if (user) {
        throw { error: 400, message: "Name already taken." }
      } else {
        return bcrypt.hash(body.password, 10)
      }
    })
    .then(hash =>
      knex("users")
        .insert({ ...body, password: hash })
        .returning("*")
    )
    .then(([ newUser ]) => {
      delete newUser.password;
      return newUser;
    });
}

/**********************
 *  HELPER FUNCTIONS  *
 **********************/

const getGamesStatusFromRedis = games => {
  const redisPromises = games.map(game =>
    redisAsPromised.hget(GAME_ID + game.id, "turn"));

  return Promise.all(redisPromises)
    .then(statuses => {
      return games.map((game, idx) => {
        if (statuses[idx]) game.status = statuses[idx];
        return game;
      })
    });
}

const getGamesStatusFromFens = games =>
  games.map(game => {
    game.status = gameStatusFromFen(game.previous_fen)

    delete game.previous_fen;

    return game;
  })

const gameStatusFromFen = fenString => {
  const [ _, status, ...rest ] =  fenString.split(" ");

  return status;
}


module.exports = { getUserGames, createUser }
