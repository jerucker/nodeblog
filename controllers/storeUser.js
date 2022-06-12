const User = require("../database/models/User");
const path = require("path");

const { error } = require("console");

module.exports = (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const validationErrors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      // req.session.validationErrors = validationErrors;
      // Errors will now be installed in the flash - stored in the validationErrors key
      req.flash("validationErrors", validationErrors);
      // data from user registration is stored in the data key from req.body
      req.flash("data", req.body);
      return res.redirect("/auth/register");
    }
    res.redirect("/");
  });
};

// module.exports = (req, res) => {
//   User.create(req.body, (error, user) => {
//     // If there is an error the page will redirect back to the regaister form
//     //  pathe /auth/register
//     if (error) {
//       // we will assign the errors to validationErrors variable
//       const validationErrors =
//         // Object will place all of the error in an arrey
//         // map.key will map ou the errors in the console log to see
//         Object.keys(error.errors).map((key) => {
//           console.log(error.errors[key].message);
//           error.errors[key].message;

//         });
//       return res.redirect("/auth/register");
//     }

//     //  If the registration is succesful the page will redirect
//     // back to the home apge

//     res.redirect("/");
//   });
// };
