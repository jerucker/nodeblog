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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

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
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Must run after fileUpload
app.use("/post/store", validateMiddleWare);

// Route Controllers
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getpostController = require("./controllers/getPost");

//----------------------------------------------------------
app.get("/", homeController);
app.get("/post/:id", getpostController);
app.get("/create", newPostController);
app.get("/post/store", storePostController);
