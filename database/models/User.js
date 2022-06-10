const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  // This maked the username required & unique
  username: {
    type: String,
    required: true,
    unique: true,
  },
  // This make the password required
  password: {
    type: String,
    required: true,
  },
});

// encrypt passwords
UserSchema.pre("save", function (next) {
  const user = this;
  // Hash time will slow server respone down I changed it from 100 to 10
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
