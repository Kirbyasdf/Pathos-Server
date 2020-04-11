const { Router } = require("express");
const { test } = require("../controllers/message.controller.js");

const router = new Router();

router.route("/test").get(test);
router.route("/fetchlog/:chatroom_id").get(loadMessageLog);

module.exports = router;
