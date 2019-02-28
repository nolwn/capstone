const router = require("express").Router();

const controllers = require("../controllers/auth");
const { isAuthenticated } = require("../utils");

router.post("/login", controllers.login);
router.get("/token", isAuthenticated, controllers.token);

module.exports = router;
