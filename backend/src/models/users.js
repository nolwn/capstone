const knex = require("../../db");

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
      "games.updated_at"
    );

module.exports = { getUserGames }
