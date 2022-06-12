const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  // populate('userid) will link the user to the their post
  const posts = await Post.findById(req.params.id).populate("userid");
  res.render("post", {
    posts,
  });
};
