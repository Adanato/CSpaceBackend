const Comment = require("../models/Comment");
const Post = require("../models/Post");

const getAllComments = async (req, res) => {
  const { id: post_id } = req.params;
  const comments = Comment.find({ post: post_id });
  if (!comments) res.status(StatusCodes.OK).json({ comments });
};

const createComment = async (req, res) => {
  const {userId}
  res.send("send all comments");
};

const updateComment = async (req, res) => {
  res.send("send all comments");
};

const deleteComment = async (req, res) => {
  res.send("send all comments");
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
