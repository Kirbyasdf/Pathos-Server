const { Router } = require("express");
const { test } = require("../controllers/message.controller.js");

const router = new Router();

router.route("/test").get(test);

module.exports = router;
