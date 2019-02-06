const jwt = require("jsonwebtoken");

const models = require("../models/auth");

const secret = process.env.SECRET;

const login = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw { status: 400, message: "Supply both a username and password" }
  }

  models.login(req.body.username, req.body.password)
    .then(user => {
      const token = jwt.sign({
        id: user.id,
        username: user.username
      },
      secret
    )

    res.status(200).send(token);
    })
    .catch(next);
}

module.exports = { login };
