const Post = require("../database/models/Post");
const path = require("path");

module.exports = async (req, res) => {
  // The express upload adds the files property
  let image = req.files.image;
  // mv is the move image into the directory of our choice
  image.mv(
    path.resolve(__dirname, "..", "public/img", image.name),
    async (error) => {
      await Post.create({
        // ... means that we are making a copy of the opbject req.body and it properties
        ...req.body,
        image: "/img/" + image.name,
        // this will assisign a userid to each post
        // created from the Post.js database/model this userid is populated by the sessions
        // this is from the loginUser.js file look and you will see the userID from the
        // sessions
        userid: req.session.userID,
        // Note to see the data the form must be - application/x-www-form-urlencoded
        // Changing save code for saving image to database
      });
      console.log(req.body);
      res.redirect("/");
    }
  );
  // The object req.body will save the information coming from the browsers form on the
  //  new post create page
  // Create a new document for the database
};

// const cloudinary = require('cloudinary');
// const Post = require('../database/models/Post')

// module.exports = (req, res) => {
//   const { image } = req.files

//   const uploadPath = path.resolve(__dirname, '..', 'public/posts', image.name);

//   image.mv(uploadPath, (error) => {
//     cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
//       if (error) {
//        return res.redirect('/');
//       }
//       Post.create({
//         ...req.body,
//         image: result.secure_url,
//         author: req.session.userId
//       }, (error, post) => {
//         res.redirect("/");
//       });
//     });
//   })
// }
