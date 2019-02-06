const router = require("express").Router();

const controllers = require("../controllers/auth");

router.use("/login", controllers.login);

module.exports = router;
