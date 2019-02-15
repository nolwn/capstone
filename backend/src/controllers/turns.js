const models = require("../models/turns");

const whiteTurn = (req, res, next) =>
  models(req.params.game_id, req.body)
    .then(state => req.status(201).send(state))
    .catch(next);


const blackTurn = (req, res, mext) => {
  models(req.body)
    .then(state => req.status(200).send(state))
    .catch(next);
}

module.exports = { whiteTurn, blackTurn }
