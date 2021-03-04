const { PRIVATE_KEY } = require("./private");
const { UserAuth } = require("./router/model");
const jwt = require("jsonwebtoken");

const loginAuth = async (req, res, next) => {
  const reqToken = String(req.headers.authorization).split(" ").pop();
  const { id } = jwt.verify(reqToken, PRIVATE_KEY);
  req.user = await UserAuth.findById(id);
  next();
};

module.exports = {
  loginAuth,
};
