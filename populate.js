require("dotenv").config();

const connectDB = require("./db/connect");
const Post = require("./models/Post");
const jsonPosts = require("./posts.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Post.deleteMany();
    await Post.create(jsonPosts);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
