const models = require("../models/moves");

const getGame = (req, res, next) => {
  return models.getGame(1)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
}

module.exports = { getGame };
