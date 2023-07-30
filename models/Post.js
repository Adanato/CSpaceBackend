const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Must provide author"],
    trim: true,
    maxlength: [50, "Author name cannot be more than 50 characters"],
  },
  title: {
    type: String,
    required: [true, "Must provide title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Must provide description"],
    trim: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [CommentSchema],
});

module.exports = mongoose.model("Post", PostSchema);
