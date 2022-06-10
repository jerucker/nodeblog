// Form validation middleware
module.exports = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/create");
  }
  // next() is need to tell the middleware to move on to the next action
  // other wise the app will hang
  next();
};
