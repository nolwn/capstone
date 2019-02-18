const knex = require("../../db");
const bcrypt = require("bcrypt");

const login = (username, password) => {
  let user;

  return knex("users")
    .where({ username })
    .first()
    .then(userData => {
      user = userData;

      if (!user) {
        throw { status: 400, message: "Bad Request" };
      }

      return bcrypt.compare(password, user.password)
    })
    .then(result => {
      if (!result) {
        throw { status: 400, message: "Bad Request" };
      }
    })
    .then(_ => {
      return knex("games")
        .leftJoin("users AS white", "player_white", "white.id")
        .leftJoin("users AS black", "player_black", "black.id")
        .where({ ended_at: null, player_white: user.id })
        .orWhere({ ended_at: null, player_black: user.id })
        .select("games.id", "player_white", "player_black");
    })
    .then(userGames => {
      user.games = userGames

      return user;
    });
}

module.exports = { login }
