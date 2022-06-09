const { response } = require("express");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { request } = require("http");
const fileUpload = require("express-fileupload");

const app = express();
const path = require("path");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

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

// Form validation middleware
const validateMiddleWare = (req, res, next) => {
  if (req.files == null || req.body.title == null) {
    return res.redirect("/create");
  }
  // next() is need to tell the middleware to move on to the next action
  // other wise the app will hang
  next();
};

// BodyParser
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Must run after fileUpload
app.use("/post/store", validateMiddleWare);

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
app.post("/post/store", async (req, res) => {
  // The express upload adds the files property
  let image = req.files.image;
  // mv is the move image into the directory of our choice
  image.mv(path.resolve(__dirname, "public/img", image.name), async (error) => {
    await Post.create({
      // ... means that we are making a copy of the opbject req.body and it properties
      ...req.body,
      image: "/img/" + image.name,
      // Note to see the data the form must be - application/x-www-form-urlencoded
      // Changing save code for saving image to database
    });
    console.log(req.body);
    res.redirect("/");
  });
  // The object req.body will save the information coming from the browsers form on the
  //  new post create page
  // Create a new document for the database
});
