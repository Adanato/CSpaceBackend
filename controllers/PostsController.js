const { StatusCodes } = require("http-status-codes");
const Post = require("../models/Post");
const CustomError = require("../errors");
const getAllPosts = async (req, res) => {
  const posts = await Post.find({});

  res.status(StatusCodes.OK).json({ posts });
};

const createPost = async (req, res) => {
  const { name, userId, role } = req.user;
  console.log(req.body);
  const post = await Product.create({});
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
  res.status(StatusCodes.CREATED).json({ ...postObject, likes: likes.length });
};
const updatePost = async (req, res) => {
  const { userId } = req.user;
  const { id: post_id } = req.params;
  let post = await Post.findOne({ _id: post_id });

  if (!post) {
    throw new CustomError.NotFoundError(
      `Post wasnt found with id : ${post_id} `
    );
  }
  if (userId !== post._id) {
    throw new CustomError.UnauthorizedError(
      `Ownership of post belongs to someone else`
    );
  }
  const postObject = post.toObject();
  const { likes } = postObject;

  delete postObject.updatedAt;
  res.status(StatusCodes.OK).json({ ...postObject, likes: likes.length });
};
const deletePost = async (req, res) => {
  req.res.send("route");
};

const likePost = async (req, res) => {
  res.send("route");
};
module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
};
