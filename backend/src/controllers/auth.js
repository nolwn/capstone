const jwt = require("jsonwebtoken");

const models = require("../models/auth");

const secret = process.env.SECRET;

// TODO: pull games objects from database.
const login = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw { status: 400, message: "Supply both a username and password" }
  }

  models.login(req.body.username, req.body.password)
    .then(user => {
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        games: user.games.reduce((acc, game) => {
          acc[`game-${game.id}`] = game.player_white === user.id ?
          "white" :
          "black";

          return acc;
        }, {})
      },
      secret
      )

      res.status(200).send({ token, id: user.id, username: user.username });
    })
    .catch(next);
}

const token = (req, res, next) => {
  res
    .status(200)
    .send({
      token: req.headers.authorization.split(" ")[1],
      id: req.claim.id,
      username: req.claim.username
    });
}

module.exports = { login, token };
