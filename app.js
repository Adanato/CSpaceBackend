const express = require("express");
const app = express();
const cors = require("cors");
const Posts = require("./routes/Posts");

const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// middle ware
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/posts", Posts);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.error(error); // It's a good practice to log the error for debugging.
  }
};

start();
