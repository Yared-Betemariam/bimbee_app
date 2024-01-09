const createHttpError = require("create-http-error");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const signIn = async (req, res) => {
  const { username, email, password: passwordRaw } = req.body;

  if (!username || !email || !passwordRaw) {
    throw createHttpError(400, "Parameters Missing");
  }

  const userWithUsername = await User.findOne({ username: username });
  if (userWithUsername) throw createHttpError(409, "Username taken");
  const userWithEmail = await User.findOne({ email: email });
  if (userWithEmail) throw createHttpError(409, "Email taken");

  const user = await User.create({
    username: username,
    email: email,
    password: passwordRaw,
  });

  req.session.userId = user._id;
  const token = user.createJWT();

  res
    .status(200)
    .json({ user: { username: user.username, email: user.email }, token });
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) throw createHttpError(400, "Missing Parameters");

  const user = await User.findOne({ username: username }).select(
    "+password +email"
  );

  if (!user) throw createHttpError(401, "Invalid Credientals");

  const passMatch = await user.checkPassword(password);
  if (!passMatch) throw createHttpError(401, "Invalid Credientals");

  req.session.userId = user._id;
  const token = user.createJWT();
  res
    .status(201)
    .json({ user: { username: user.username, email: user.email }, token });
};

const getAuthenticatedUser = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw createHttpError(401, "Authentication invalid");

  const token = authHeader.split(" ")[1];
  const payload = jwt.verify(token, jwtSecret);

  // const authUserId = req.session.userId;
  // if (!authUserId) throw createHttpError(401, "User not authenticated");

  const user = await User.findById(payload.userId).select("+email");
  if (!user) throw createHttpError(401, "User not authenticated");
  res.status(200).json(user);
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) throw error;
    else res.sendStatus(200);
  });
};

module.exports = {
  signIn,
  logIn,
  getAuthenticatedUser,
  logout,
};
