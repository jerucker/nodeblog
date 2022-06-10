const User = require("../database/models/User");
const path = require("path");

const { error } = require("console");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    console.log(error);
    // If there is an error the page will redirect back to the regaister form
    //  pathe /auth/register
    if (error) {
      return res.redirect("/auth/register");
    }

    //  If the registration is succesful the page will redirect
    // back to the home apge

    res.redirect("/");
  });
};
