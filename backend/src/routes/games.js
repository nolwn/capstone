const controllers = require("../controllers/games");
const { isAuthenticated } = require("../utils")
const router = require("express").Router();

const turnRoutes = require("./turns");
const commentRoutes = require("./comments");


router.get("/", controllers.getActiveGames);
router.get("/:id", controllers.getActiveGame);
router.post("/", isAuthenticated, controllers.createGame);
router.patch("/:id/join", isAuthenticated, controllers.joinGame);
router.delete("/:id", controllers.deleteGame);


router.use(turnRoutes);
router.use(commentRoutes);

module.exports = router;
