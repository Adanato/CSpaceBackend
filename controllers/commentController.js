const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
//Retrieve all comments from post
const getAllComments = async (req, res) => {
  const { id: post_id } = req.params;

  const post = await Post.findOne({ _id: post_id });
  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id}`
    );
  }
  const comments = post.comments;
  res.status(StatusCodes.OK).json({ comments });
};

const createComment = async (req, res) => {
  const { userId, name } = req.user;
  const { id: post_id } = req.params;
  const { text: text } = req.body;
  const post = await Post.findOne({ _id: post_id });
  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }

  if (!text) {
    throw new CustomError.BadRequestError("Please provide a proper comment");
  }

  const comment = await Comment.create({
    post: post_id,
    userId: userId,
    name: name,
    text: text,
  });
  post.comments.push(comment._id);
  await post.save();
  res.status(StatusCodes.CREATED).json({ comment });
};

const updateComment = async (req, res) => {
  const { text } = req.body;
  const { userId } = req.user;
  const { id: post_id, comment_id: comment_id } = req.params;
  const post = await Post.findOne({ _id: post_id });

  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id}`
    );
  }
  const comments = post.comments;
  if (!comments.includes(comment_id)) {
    throw new CustomError.NotFoundError(
      `Post doesn't contain comment id : ${comment_id} `
    );
  }
  const comment = await Comment.findOne({ _id: comment_id });
  if (!comment) {
    throw new CustomError.NotFoundError(
      `Comment wasnt found with id : ${comment_id}`
    );
  }

  if (userId !== String(comment.userId)) {
    throw new CustomError.UnauthorizedError("Not allowed to edit this comment");
  }
  comment.text = text;
  await comment.save();
  res.status(StatusCodes.OK).json({ comment });
};

const deleteComment = async (req, res) => {
  const { userId, name } = req.user;
  const { id: post_id } = req.params;
  const { text: text } = req.body;
  const post = await Post.findOne({ _id: post_id });
  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }

  if (!text) {
    throw new CustomError.BadRequestError("Please provide a proper comment");
  }

  const comment = await Comment.create({
    post: post_id,
    userId: userId,
    name: name,
    text: text,
  });

  post.comments.pull(comment._id);
  await comment.remove();
  await post.save();
  res.status(StatusCodes.OK).json({ comment });
};

const likeComment = async (req, res) => {
  const { userId } = req.body;
  const { comment_id: comment_id } = req.params;
  const comment = Comment.findOne({ _id: comment_id });
  if (!comment) {
    throw new CustomError.NotFoundError(
      `No comment with id : ${comment_id} found`
    );
  }
  if (!comment.likes.includes(userId)) {
    comment.likes.push(userId);
  } else {
    throw res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already liked" });
  }

  await comment.save();

  res.status(StatusCodes.OK).json({});
};

const dislikeComment = async (req, res) => {
  const { userId } = req.body;
  const { comment_id: comment_id } = req.params;
  const comment = Comment.findOne({ _id: comment_id });

  if (!comment) {
    throw new CustomError.NotFoundError(
      `No comment with id : ${comment_id} found`
    );
  }

  if (!comment.dislikes.includes(userId)) {
    comment.dislikes.push(userId);
  } else {
    throw res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already disliked" });
  }

  await comment.save();

  res.status(StatusCodes.OK).json({});
};

const removeLikeComment = async (req, res) => {
  const { userId } = req.body;
  const { comment_id: comment_id } = req.params;
  const comment = Comment.findOne({ _id: comment_id });

  if (!comment) {
    throw new CustomError.NotFoundError(
      `No comment with id : ${comment_id} found`
    );
  }

  if (comment.likes.includes(userId)) {
    comment.likes.pull(userId);
  } else {
    throw res.status(StatusCodes.BAD_REQUEST).json({ msg: "Already unliked" });
  }

  await comment.save();

  res.status(StatusCodes.OK).json({});
};

const removeDislikeComment = async (req, res) => {
  const { userId } = req.body;
  const { comment_id: comment_id } = req.params;
  const comment = Comment.findOne({ _id: comment_id });

  if (!comment) {
    throw new CustomError.NotFoundError(
      `No comment with id : ${comment_id} found`
    );
  }

  if (comment.dislikes.includes(userId)) {
    comment.dislikes.pull(userId);
  } else {
    throw res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Already undisliked" });
  }

  await comment.save();

  res.status(StatusCodes.OK).json({});
};

module.exports = {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
};
