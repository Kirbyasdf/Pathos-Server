const { Router } = require("express");
const { test, login, register } = require("../controllers/user.controller.js");

const router = new Router();

router.route("/test").get(test);
router.route("/defaultuser/:userCall").get(defaultUser);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);

module.exports = router;
