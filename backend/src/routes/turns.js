const router = require("express").Router({ mergeParams: true });

const controllers = require("../controllers/turns");

router.post("/", controllers.whiteTurn);

module.exports = router;
