const router = require("express").Router({ mergeParams: true });

const controllers = require("../controllers/turns");
const { isAuthenticated, isPlayer, isPlayerToken, isTurn } = require("../utils");

router.post("/", isAuthenticated, isPlayerToken, isTurn, controllers.whiteTurn);

module.exports = router;
