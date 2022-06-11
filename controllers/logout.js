// this will log a user out and return them to the home page

module.exports = (req, res) => {
  // this will destroy all session data and return user to home page
  req.session.destroy(() => {
    res.redirect("/");
  });
};
