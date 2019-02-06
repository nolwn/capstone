const models = require("../models/games");

const getGame = (req, res, next) => {
  return models.getGame(1)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
}

const getActiveGames = (req, res, next) => {
  return knex("games")
    .where("started_at", null);
}

const createGame = (req, res, next) => {

}

const editGame = (req, res, next) => {

}

const deleteGame = (req, res, next) => {

}

module.exports = { getActiveGames, getGame, createGame, editGame, deleteGame };
