const express = require("express");
const app = express();
const cors = require("cors");

//Routes
const Posts = require("./routes/Posts");
const Auth = require("./routes/Auth");

const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

// middle ware
app.use(cors());
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/posts", Posts);
app.use("/api/v1/auth", Auth);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port ${port}...`));
    connectDB;
  } catch (error) {}
};

start();
