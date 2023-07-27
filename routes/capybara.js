const express = require("express");
const router = express.Router();

const {
  getAllCapybaras,
  createCapybara,
  getCapybara,
  updateCapybara,
  deleteCapybara,
} = require("../controllers/capybaras");
router.route("/").get(getAllCapybaras).post(createCapybara);
router
  .route("/:id")
  .get(getCapybara)
  .patch(updateCapybara)
  .delete(deleteCapybara);

module.exports = router;
