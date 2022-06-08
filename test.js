const mongoose = require("mongoose");
const Post = require("./database/models/Post");

mongoose.connect("mongodb://localhost:27017/blogejs-test");

//------------------------------------------------------------

//  Create - Data - This will create data in the database

Post.create(
  {
    title: "3rd My first blog post",

    description: "3rd Blog post description",

    content:
      "2nd Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  (error, post) => {
    console.log(error, post);
  }
);

// ------------------------------------------------------------------

//  Read & Find Data

// Post.find({}, (error, post) => {
//   console.log(error, post);
// });

//  Find a specific post -----------------------------------

// Post.find(
//   {
//     title: "3rd My first blog post",
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );

//  Find by id ------------------------------------------------

// Post.findById("629c3ed6b18dbefe6c7091b6", (error, post) => {
//   console.log(error, post);
// });

//  Find and update a feild in the data

// Post.findByIdAndUpdate(
//   "629c3ed6b18dbefe6c7091b6",
//   {
//     title: "Skip Baless Sucks",
//   },
//   (error, post) => {
//     console.log(error, post);
//   }
// );
