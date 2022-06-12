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
const expressSession = require("express-session");
const { error } = require("console");
// Pull in database model to get data from form to database
const Post = require("./database/models/Post");
const flash = require("connect-flash");

// Global logged in value - It is empty now
global.loggedIn = null;

// Localhost Port
const port = 3071;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Mongodb Connection
mongoose.connect("mongodb://localhost:27017/blogejs-dev01");
// Remote Connection

// Static Files
app.use(express.static("public"));
// Set Templating Engine
app.use(expressLayouts);
// app.set("views", __dirname + "/views");
app.set("layout", "./layouts/mainlayout");
app.set("view engine", "ejs");

// Form validation middleware
// Checks to see if create post feilds are filled
const validateMiddleWare = require("./middleware/validation");
// Protects non users from accessing create post page or saving a new post
const protectMiddleWare = require("./middleware/protect");
// Logged in user cannot access Login or New User page once logged in
const userloggedinMiddleWare = require("./middleware/userloggedinredirect");

// BodyParser
//Here we are configuring express to use body-parser as middle-ware.
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
// Must run after fileUpload
// Check to see if create new post feilds are filled
app.use("/post/store", validateMiddleWare);
// this will encrypt the  browser cookie for a user
// Express session Middleware creates userID
app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);

// Connect flash
app.use(flash());

// Must go after the expressSession middleware
// userID will only be called after the expressSession Middleware
// Get the session userid from the user and assigns it to the loggedIn variable
// '*' means that the it is accessable from all ejs files
// '*' can be excuted from all request
app.use("*", (req, res, next) => {
  loggedIn = req.session.userID;
  next();
});

// Route Controllers
const newPostController = require("./controllers/newPost");
const homeController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getpostController = require("./controllers/getPost");
// Renders new user page
const newUserController = require("./controllers/newUser");
// Stores new user info
const storeUserController = require("./controllers/storeUser");
// Renders to render login page
const loginController = require("./controllers/login");

// Check login user creditails
const loginUserController = require("./controllers/loginUser");

//  Log users out
const logoutUserController = require("./controllers/logout");

//Routes aka urls----------------------------
app.get("/", homeController);
app.get("/post/:id", getpostController);
// The protectMiddleware wiil run before a user can create a post
// to check to see if they are a user & logged in
app.get("/create", protectMiddleWare, newPostController);
app.post("/post/store", protectMiddleWare, storePostController);

// userloggedinMiddleWare makes it so users dont have to login again
// Registraion user Route
app.get("/auth/register", userloggedinMiddleWare, newUserController);
// Stores new user info
app.post("/users/register", userloggedinMiddleWare, storeUserController);
// Login Page Route
app.get("/auth/login", userloggedinMiddleWare, loginController);
// Check login creditial route
app.post("/user/login", userloggedinMiddleWare, loginUserController);

// Log user Out
app.get("/auth/logout", logoutUserController);

// 404 Route - Node will go through all of the routes
//  if none found it will display the 404 route below
app.use((req, res) => {
  res.render("notfound");
});
