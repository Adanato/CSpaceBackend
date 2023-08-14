const request = require("supertest");
const express = require("express");
const app = express();

const { register, login, logout } = require("../../controllers/authController");
app.get("/api/v1/auth/register", register);

describe("Register from AuthController", () => {
  it("should return user details", async () => {
    const res = await request(app).get("/user");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John Doe");
  });
});
