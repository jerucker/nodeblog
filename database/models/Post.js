const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  // username: String,
  // Changed to userid & use mongoose to link post to user
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  datePosted: {
    type: Date,
    default: new Date(),
  },
  image: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
