const controllers = require("../controllers/games");
const router = require("express").Router();

const turnRoutes = require("./turns");
const commentRoutes = require("./comments");


router.get("/", controllers.getGame);
router.get("/:id", controllers.getGame);

router.use(turnRoutes);
router.use(commentRoutes);

module.exports = router;
