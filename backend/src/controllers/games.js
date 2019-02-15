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
  return models.createGame( req.body, req.claim)
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

const joinGame = (req, res, next) => {
  return models.joinGame(req.params.game_id, req.body, req.claim)
    .then(result => {
      if (!result) {
        throw { status: 400, message: "Game could not be joined" };
      }

      return jwtAsPromised.sign(result, secret);
    })
    .then(token => {
      res.status(200).send(token);
    })
    .catch(err => console.log(err));
}

const deleteGame = (req, res, next) => {

}

module.exports = { getActiveGames, getActiveGame, createGame, joinGame, deleteGame };
