require("dotenv").config();

const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "secret-key"
    );
  } catch (err) {
    next(new UnauthorizedError("Необходима авторизация"));
  }

  req.user = payload;

  next();
};
