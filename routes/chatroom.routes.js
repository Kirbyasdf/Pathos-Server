const { Router } = require("express");
const { test } = require("../controllers/chatroom.controller.js");

const router = new Router();

router.route("/test").get(test);
router.route("/defaultchatroom").get(loadDefaultChatroom);

module.exports = router;
