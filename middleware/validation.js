// Form validation middleware.  Makes sure all the required feilds are
// filled out for creating a blog post on the create new page

module.exports = (req, res, next) => {
  // Check to see if images has been selected (req.files)
  //  req.body.title checks to see if the title file is filed
  if (
    req.files == null ||
    req.body.title == null ||
    req.body.description == null
  ) {
    return res.redirect("/create");
  }
  // next() is need to tell the middleware to move on to the next action
  // other wise the app will hang
  next();
};
