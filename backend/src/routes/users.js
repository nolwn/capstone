const router = require("express").Router({ mergeParams: true });

const controllers = require("../controllers/users");

router.get("/:user_id/games", controllers.getUserGames)
router.post("/", controllers.createUser)

module.exports = router;
