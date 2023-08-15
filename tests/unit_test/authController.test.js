// ============= [Imports] =============
const express = require("express");
const request = require("supertest");
const connectDB = require("../../db/connect");
require("dotenv").config();
require("express-async-errors");

// Middleware imports
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// Router imports
const Auth = require("../../routes/authRoutes");

// Error middleware imports
const notFound = require("../../middleware/not-found");
const errorHandler = require("../../middleware/error-handler");

// ============= [App Initialization] =============
const app = express();

// ============= [Middleware Activation] =============
app.set("trust proxy", 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 60 }));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());

// ============= [Routes] =============
app.use("/api/v1/auth", Auth);

// ============= [Error Handlers] =============
app.use(notFound);
app.use(errorHandler);

// ============= [Database Connection] =============
beforeAll(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.error(error);
  }
});

// ============= [Tests] =============
describe("Register from Routes", () => {
  it("should return user details", async () => {
    const mockUserData = {
      name: "adam",
      password: "securepassword123",
      email: "adam@example.com",
    };

    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUserData);

    expect(res.statusCode).toEqual(400);
    console.log(res.headers);
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.body).toMatchObject({
      name: "John Doe",
      email: "john.doe@example.com",
    });
  }, 20000);
});

describe("login from Routes", () => {
  it("should send back user and cookie", async () => {
    const mockUserData = {
      name: "adam",
      password: "securepassword123",
      email: "adam@example.com",
    };

    const res = await request(app)
      .post("/api/v1/auth/login")
      .send(mockUserData);

    expect(res.statusCode).toEqual(200);
    console.log(res.headers);
    expect(res.headers["set-cookie"]).toBeDefined();
    expect(res.body).toMatchObject({
      user: {
        name: "adam",
        userId: "64dac54ee5a7cf6a52af40e7",
        role: "admin",
      },
    });
  }, 20000);
});
