const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");

// Reports user trying to register with already taken username
var uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  // This maked the username required & unique

  // [true, "Please provide username"], lets use make custom messages
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  // This make the password required
  password: {
    type: String,
    required: [true, "Please provide password"],
  },
});

// Reports user trying to register with already taken username
UserSchema.plugin(uniqueValidator);

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
