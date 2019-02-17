const controllers = require("../controllers/games");
const { isAuthenticated } = require("../utils")
const router = require("express").Router();

const turnRoutes = require("./turns");
const commentRoutes = require("./comments");


router.get("/", isAuthenticated, controllers.getPendingGames);
router.get("/:id", isAuthenticated, controllers.getPendingGame);
router.post("/", isAuthenticated, controllers.createGame);
router.patch("/:game_id/join", isAuthenticated, controllers.joinGame);
router.delete("/:game_id", isAuthenticated, controllers.deleteGame);

router.use("/:game_id/turns", turnRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
