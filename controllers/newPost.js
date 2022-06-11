// const { create } = require("../database/models/Post");

module.exports = (req, res) => {
  // if user is logged in and has session key ,they can see the create post page
  if (req.session.userID) {
    return res.render("create");
  }
  // if no session key they will be redirected back to the login page
  res.redirect("/auth/login");

  // if (req.session.userId) {
  //   return res.render("create");
  // }
  // res.redirect('/auth/login')
};
