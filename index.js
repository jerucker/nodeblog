const { response } = require("express");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { request } = require("http");
const app = express();
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
// Pull in database model to get data from form to database
const Post = require("./database/models/Post");
const { error } = require("console");
const port = 3071;

// Mongodb Connection
mongoose.connect("mongodb://localhost:27017/blogejs-dev01");

// Static Files
app.use(express.static("public"));

// Set Templating Engine
app.use(expressLayouts);
// app.set("views", __dirname + "/views");
app.set("layout", "./layouts/mainlayout");
app.set("view engine", "ejs");

// BodyParser
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Home Page
app.get("/", async (req, res) => {
  // Code below will find all of the post - await Post.find({})
  const posts = await Post.find({});
  console.log(posts);

  // This will show you the post in the terminal
  // console.log(posts);

  res.render("index", {
    posts: posts,
  });
});

// app.get("", (req, res) => {
//   res.render("index", { text: "EJS Blog" });
// });

app.get("/about", (req, res) => {
  res.render("about", { text: "About Page" });
});

// The id will accept a wild card value
app.get("/post/:id", async (req, res) => {
  const posts = await Post.findById(req.params.id);
  res.render("post", {
    posts,
  });
});

app.get("/create", (req, res) => {
  res.render("create", { text: "Create Post" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { text: "Contact Page" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//  Store Post Data to data base
// After the user submit a new post he or she is redirected to the home page
app.post("/post/store", (req, res) => {
  // The express upload adds the files property
  let image = req.files.image;
  // mv is the move image into the directory of our choice
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await Post.create(req.body, (error, post) => {
      // Note to see the data the form must be - application/x-www-form-urlencoded

      res.redirect("/");
      console.log(req.body);
    });
  });
  // The object req.body will save the information coming from the browsers form on the
  //  new post create page
  // Create a new document for the database
});
