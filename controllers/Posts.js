const Post = require("../models/Post");

const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllPosts = asyncWrapper(async (req, res) => {
  const posts = await Post.find({});
  res.status(200).json(posts);
});

const createPost = asyncWrapper(async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json({ post });
});

const getPost = asyncWrapper(async (req, res, next) => {
  const { id: postID } = req.params;
  const post = await Post.findOne({ _id: postID });
  if (!post) {
    return next(createCustomError(`No post with id: ${postID}`));
  }
  res.status(200).json({ post });
});

const updatePost = asyncWrapper(async (req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOneAndUpdate({ _id: postID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!post) {
    return res.status(404).json({ msg: `No post with id: ${postID}` });
  }

  res.status(200).json({ post });
});

const deletePost = asyncWrapper(async (req, res) => {
  const { id: postID } = req.params;
  const post = await Post.findOneAndDelete({ _id: postID });

  if (!post) {
    return res.status(404).json({ msg: `No post with id: ${postID}` });
  }
  res.status(200).json({ post });
});

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
