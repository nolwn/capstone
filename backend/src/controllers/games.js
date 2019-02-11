const models = require("../models/games");
const { jwtAsPromised } = require("../utils");

const secret = process.env.SECRET;

const getActiveGame = (req, res, next) => {
  return models.getActiveGame(req.params.id)
    .then(result =>
      res.status(200).send(result)
    )
    .catch(next);
}

const getActiveGames = (req, res, next) => {
  return models.getActiveGames()
    .then(result =>
      res.status(200).send(result)
    )
    .catch(next);
}

const createGame = (req, res, next) => {
  return models.createGame(req.body, req.claim)
    .then(result => {
      if (!result) {
        throw { status: 400, message: "Game could not be created" };
      }

      return jwtAsPromised.sign(result, secret);
    })
    .then(token => {
      res.status(201).send(token);
    })
    .catch(next);
}

const editGame = (req, res, next) => {

}

const deleteGame = (req, res, next) => {

}

module.exports = { getActiveGames, getActiveGame, createGame, editGame, deleteGame };
