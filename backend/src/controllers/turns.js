const models = require("../models/turns");

const whiteTurn = (req, res, next) =>
  models.whiteTurn(req.params.game_id, req.body)
    .then(state => res.status(201).json(state))
    .catch(next);


const blackTurn = (req, res, mext) => {
  models(req.body)
    .then(state => res.status(200).send(state))
    .catch(next);
}

module.exports = { whiteTurn, blackTurn }
