const request = require("supertest");
const express = require("express");
const app = express();

const { register, login, logout } = require("../../controllers/AuthController");
app.get("/api/v1/auth/register", register);

describe("Register from AuthController", () => {
  it("should return user details", async () => {
    const mockUserData = {
      username: "JohnDoe",
      password: "securepassword123",
      email: "john.doe@example.com",
      // ... any other fields you want to send
    };
    // sending user data
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUserData);

    expect(res.statusCode).toEqual(200);
    console.log(res);
    expect(res.body).toHaveProperty("name", "John Doe");
  });
});

describe("Register from AuthController", () => {
  it("should return user details", async () => {
    const mockUserData = {
      username: "JohnDoe",
      password: "secretpass",
      email: "john@example.com",
    };
    // sending user data
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUserData);

    res = await request(app).post("/api/v1/auth/register").send(mockUserData);
    expect(res.statusCode).toEqual(404);
    console.log(res);
    expect(res.body).toHaveProperty("name", "John Doe");
  });
});
