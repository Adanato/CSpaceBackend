const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/Auth");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);
router.route("/forgot-password").post(createPass);

module.exports = router;
