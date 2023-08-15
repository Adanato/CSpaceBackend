const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const CustomError = require("../errors");
const getAllPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const { name, userId, role } = req.user;
  res.send({ name, userId, role });
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
  res.status(StatusCodes.CREATED).json({ ...postObject, likes: likes.length });
};
const updatePost = async (req, res) => {
  res.send("route");
};
const deletePost = async (req, res) => {
  req.res.send("route");
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
