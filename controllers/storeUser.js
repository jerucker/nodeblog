const Post = require("../database/models/User");
const path = require("path");
const User = require("../database/models/User");
const { error } = require("console");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    console.log(error);
    res.redirect("/");
  });
};
