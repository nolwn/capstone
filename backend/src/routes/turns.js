const router = require("express").Router({ mergeParams: true });

const controllers = require("../controllers/turns");
const { isAuthenticated, isPlayer, isTurn } = require("../utils");

router.post("/", isAuthenticated, isPlayer, controllers.whiteTurn);

module.exports = router;
