const request = require("supertest");
const express = require("express");
const app = express();

const { register } = require("../controllers/authController");
app.get("/user", getUser);

describe("User Controller", () => {
  it("should return user details", async () => {
    const res = await request(app).get("/user");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("name", "John Doe");
  });
});
