const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.json());

const authRouter = require("../../routes/authRoutes");

app.use("/api/v1/auth", authRouter);

describe("Register from Routes", () => {
  it("should return user details", async () => {
    const mockUserData = {
      username: "adam",
      password: "securepassword123",
      email: "adam@example.com",
      // ... any other fields you want to send
    };
    // sending user data
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUserData);

    console.log(res);
    expect(res.statusCode).toEqual(200);

    expect(res.body).toMatchObject({
      name: "John Doe",
      email: "john.doe@example.com",
    });
  }, 5000);
});
