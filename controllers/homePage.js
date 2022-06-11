const Post = require("../database/models/Post");

module.exports = async (req, res) => {
  // Home Page
  // Code below will find all of the post - await Post.find({})
  const posts = await Post.find({});
  console.log(req.session);
  // console.log(posts);
  // This will show the session of a logged in user on the home page

  // This will show you the post in the terminal
  // console.log(posts);
  res.render("index", {
    posts: posts,
  });
};

// const posts = await Post.find({}).populate('author');
// res.render("index", {
//   posts
// });
