const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController");

router.route("/").get(getAllPosts).post(authenticateUser, createPost);
router
  .route("/:id")
  .get(getPost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost);

module.exports = router;
