const models = require("../models/users");

const getUserGames = (req, res, next) => {
  models.getUserGames(req.params.user_id)
    .then(result => {
      res.status(200).send(result)
    })
    .catch(next)
}

module.exports = { getUserGames };
