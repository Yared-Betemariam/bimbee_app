const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    select: false,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcyrpt.genSalt(10);
  this.password = await bcyrpt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (newPass) {
  const ans = await bcyrpt.compare(newPass, this.password);
  return ans;
};
UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, username: this.username }, jwtSecret, {
    expiresIn: "1d",
  });
};
module.exports = mongoose.model("User", UserSchema);
