const models = require("../models/games");
const { jwtAsPromised } = require("../utils");

const secret = process.env.SECRET;

const getPendingGame = (req, res, next) => {
  return models.getPendingGame(req.params.id)
    .then(result =>
      res.status(200).send(result)
    )
    .catch(next);
}

const getPendingGames = (req, res, next) => {
  return models.getPendingGames()
    .then(result =>
      res.status(200).send(result)
    )
    .catch(next);
}

const createGame = (req, res, next) => {
  console.log(req.body);
  if (!(req.body.player_white ?
        !req.body.player_black :
        req.body.player_black)) { // XOR
    throw { status: 400, message: "Select one, and only one, color to play." }
  }

  const userId = req.claim.id;
  const addedUser = req.body.player_white ?
    req.body.player_white :
    req.body.player_black;

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

module.exports = { getPendingGames, getPendingGame, createGame, joinGame, deleteGame };
