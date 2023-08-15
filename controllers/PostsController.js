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
  post = { ...postObject, likes: likes.length };
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
  console.log(String(userId), String(post.userId));
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

const likePost = async (req, res) => {
  const { userId } = req.user;

  req.params;
};
const unlike = async (req, res) => {
  const { userId } = req.user;

  req.params;
};
module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
};
