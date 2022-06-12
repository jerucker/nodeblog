module.exports = (req, res) => {
  // This store the info from the new user form that the user fills out
  var username = "";
  var password = "";
  // Get the data from flash .
  // req.flash data returns an array do [0] is used to access the data
  const data = req.flash("data")[0];
  // Now check to see if data is undefined
  if (typeof data != "undefined") {
    username = data.username;
    password = data.password;
  }

  res.render("register", {
    // error are received from validationErrosr from the storeUser.js controller
    // errors: req.session.validationErrors,
    // Errors keys will now be held here
    // checks to make sure that the form is empty, form will be empty
    // when you first visti it
    errors: req.flash("validationErrors"),
    username: username,
    password: password,
  });
};
