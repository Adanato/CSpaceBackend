const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const CustomError = require("../errors");

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const { name, userId } = req.user;
  const { title, description } = req.body;
  if (!title || !description) {
    throw new CustomError.BadRequestError(
      "Please provide both title and description for the post"
    );
  }

  const post = await Post.create({
    userId: userId,
    username: name,
    title: title,
    description: description,
  });

  res.status(StatusCodes.CREATED).json({ post });
};

const getPost = async (req, res) => {
  const { id: post_id } = req.params;
  let post = await Post.findOne({ _id: post_id });
  console.log({ ...post });
  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }
  const postObject = post.toObject();
  const { likes } = postObject;

  delete postObject.updatedAt;
  // post = { ...postObject, likes: likes.length };
  post = { ...postObject };
  res.status(StatusCodes.CREATED).json({ post });
};

const updatePost = async (req, res) => {
  const { userId } = req.user;
  const { id: post_id } = req.params;
  const { title, description } = req.body;
  const post = await Post.findOne({ _id: post_id });

  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }

  if (String(userId) !== String(post.userId)) {
    throw new CustomError.UnauthorizedError(
      `Ownership of post belongs to someone else`
    );
  }

  post.title = title;
  post.description = description;
  await post.save();

  const postObject = post.toObject();
  const { likes } = postObject;
  delete postObject.updatedAt;

  res.status(StatusCodes.OK).json({ ...postObject, likes: likes.length });
};

const deletePost = async (req, res) => {
  const { userId } = req.user;
  const { id: post_id } = req.params;
  const post = await Post.findOne({ _id: post_id });
  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }

  if (String(userId) !== String(post.userId)) {
    throw new CustomError.UnauthorizedError(
      `Ownership of post belongs to someone else`
    );
  }

  await post.deleteOne();

  res
    .status(StatusCodes.OK)
    .json({ msg: `Successful Post deletion of id: ${post_id}` });
};

//Liking Controller
const likePost = async (req, res) => {
  const { userId } = req.user;
  const { id: post_id } = req.params;
  const { type } = req.query;
  const post = await Post.findOne({ _id: post_id });
  if (!type) {
    throw new CustomError.BadRequestError(
      "Please specify whether you want to like or dislike"
    );
  }
  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }

  if (
    type === "like" &&
    !post.dislikes.includes(userId) &&
    !post.likes.includes(userId)
  ) {
    post.likes.push(userId);
    await post.save();
    return res.status(StatusCodes.CREATED).json({ msg: "liked successfully" });
  } else if (type === "like") {
    return res.status(409).json({ error: "Resource already exists" });
  }

  if (
    type === "dislike" &&
    !post.dislikes.includes(userId) &&
    !post.likes.includes(userId)
  ) {
    post.dislikes.push(userId);
    await post.save();
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "disliked successfully" });
  } else if (type === "dislike") {
    return res.status(409).json({ error: "Resource already exists" });
  }

  const jsonPost = post.toObject();
  res.status(StatusCodes.OK).json({ jsonPost });
};

//Unliking controller
const unlikePost = async (req, res) => {
  const { userId } = req.user;
  const { id: post_id } = req.params;
  const { type } = req.query;
  const post = await Post.findOne({ _id: post_id });
  if (!type) {
    throw new CustomError.BadRequestError(
      "Please specify whether you want to like or dislike"
    );
  }

  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }

  if (type === "like" && post.likes.includes(userId)) {
    post.likes.pull(userId);
    await post.save();
    res.status(204).end();
  } else if (type === "like") {
    throw new CustomError.NotFoundError("like not found");
  }

  if (type === "dislike" && post.dislikes.includes(userId)) {
    post.dislikes.pull(userId);
    await post.save();
    res.status(204).json({ msg: "removed dislike" });
  } else if (type === "dislike") {
    throw new CustomError.NotFoundError("Dislike not found");
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
