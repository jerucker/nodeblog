// Makes sure only valid users can access create new post and save

const User = require("../database/models/User");

module.exports = (req, res, next) => {
  // This will check to see if the user is valid do they have a userid
  //  and extract the user id from the session
  // If the user is not found they will be redirected back to the home page
  // if found the next middleware will run

  User.findById(req.session.userID, (error, user) => {
    if (error || !user) return res.redirect("/");

    next();
  });
};
