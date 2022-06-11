// Make sure once a user is logged in that they cannot access the login page
// access the login page or the new user page.  Prvent confussions
// Middleware is places on Login & New User Page Routes

module.exports = (req, res, next) => {
  // if user is logged in redirect to home page
  if (req.session.userID) {
    return res.redirect("/");
  }
  next();
};
