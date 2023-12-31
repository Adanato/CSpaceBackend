const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/postController.js");

const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

//Main route
router.route("/").get(getAllPosts).post(authenticateUser, createPost);
router
  .route("/:id")
  .get(getPost)
  .patch(authenticateUser, updatePost)
  .delete(authenticateUser, deletePost);

//Commenting route
router
  .route("/:id/comments")
  .get(getAllComments)
  .post(authenticateUser, createComment);

router
  .route("/:id/comments/:comment_id")
  .delete(authenticateUser, deleteComment)
  .patch(authenticateUser, updateComment);

//Liking route
router
  .route("/:id/likePost")
  .post(authenticateUser, likePost)
  .delete(authenticateUser, unlikePost);

module.exports = router;
