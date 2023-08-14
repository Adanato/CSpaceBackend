const express = require("express");
const router = express.Router();

const { login, signup, createPass } = require("../controllers/Auth");

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/forgot-password").post(createPass);

module.exports = router;
