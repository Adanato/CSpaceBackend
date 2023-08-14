const { StatusCode } = require("http-status-codes");

const register = (req, res) => {
  res.status(StatusCode.OK).send("register");
};

const login = (req, res) => {
  res.send("login");
};

const logout = (req, res) => {
  res.send("logout");
};
module.exports = {
  register,
  login,
  logout,
};
