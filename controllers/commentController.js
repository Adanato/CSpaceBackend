const Comment = require("../models/Comment");
const Post = require("../models/Post");

const getAllComments = async (req, res) => {
  const comments = Comment.find({});

  res.status(StatusCodes.OK).json({ comments });
};

const createComment = async (req, res) => {
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
