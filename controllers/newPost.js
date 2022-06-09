// const { create } = require("../database/models/Post");

module.exports = (req, res) => {
  res.render("create");

  // if (req.session.userId) {
  //   return res.render("create");
  // }
  // res.redirect('/auth/login')
};
