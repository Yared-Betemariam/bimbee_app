const User = require("../models/user");
const jwt = require("jsonwebtoken");
const createHttpError = require("create-http-error");
const jwtSecret = process.env.JWT_SECRET;

const authenticationCheck = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw createHttpError(401, "Authentication invalid");
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch {
    throw createHttpError(401, "Authentication invalid");
  }
};

module.exports = authenticationCheck;
