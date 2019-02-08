const router = require("express").Router();

const controllers = require("../controllers/auth");
const { isAuthenticated } = require("../utils");

router.use("/login", controllers.login);
router.use("/token", controllers.token);

module.exports = router;
