const bcrypt = require("bcrypt");
const { model, modelNames } = require("mongoose");
const User = require("../database/models/User");

module.exports = (req, res) => {
  // Extracts the username and password from body or user schema
  const { username, password } = req.body;

  // Use the find One method to find that user (error, user)
  User.findOne({ username: username }, (error, user) => {
    // If user is found we will compare passwords
    if (user) {
      // If user is found we will now compare passwords using bcrypt
      //  compare userpassword with password from database (error,same)
      bcrypt.compare(password, user.password, (error, same) => {
        // If same is true we will redirect to home page (error,same)
        if (same) {
          // This assign a session to logged in users
          req.session.userID = user._id;
          res.redirect("/");
          //  If not he same the login page will reload
        } else {
          res.redirect("/auth/login");
        }
      });
    }

    // if user is not found we will direct back to the login page
    else {
      res.redirect("/auth/login");
    }
  });
};
