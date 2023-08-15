const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Must provide author"],
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

    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", PostSchema);
