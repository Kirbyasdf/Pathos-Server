const { Router } = require("express");
const { test } = require("../controllers/user.controller.js");

const router = new Router();

router.route("/test").get(test);
router.route("/defaultuser/:userCall").get(defaultUser);

module.exports = router;
