const express = require("express");
const {
  signIn,
  logIn,
  getAuthenticatedUser,
  logout,
} = require("../controllers/users");
const router = express.Router();

router.route("/signin").post(signIn);
router.route("/login").post(logIn);
router.route("/logout").post(logout);
router.route("/").get(getAuthenticatedUser);

module.exports = router;
