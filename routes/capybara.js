const express = require("express");
const router = express.Router();

const {
  getAllCapybaras,
  createCapybara,
  getCapybara,
  updateCapybara,
  deleteCapybara,
} = require("../controller/capybaras");
