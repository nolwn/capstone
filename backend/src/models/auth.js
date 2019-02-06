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

      return user;
    });
}

module.exports = { login }
