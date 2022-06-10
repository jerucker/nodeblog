const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  bcrypt.hash(user.password, 100, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
