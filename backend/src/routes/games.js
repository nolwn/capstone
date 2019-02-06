const controllers = require("../controllers/games");
const router = require("express").Router();

const turnRoutes = require("./turns");
const commentRoutes = require("./comments");


router.get("/", controllers.getActiveGames);
router.get("/:id", controllers.getGame);
router.post("/", controllers.createGame);
router.patch("/:id", controllers.editGame);
router.delete("/:id", controllers.deleteGame);


router.use(turnRoutes);
router.use(commentRoutes);

module.exports = router;
