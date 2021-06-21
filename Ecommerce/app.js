// Modules
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const User = require("./models/userModel");

dotenv.config({ path: "./config.env" });

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const armbandRoutes = require("./routes/armbandenRoute");
const babyRoutes = require("./routes/babyRoute");
const tasRoutes = require("./routes/tasRoute");
const waxRoutes = require("./routes/waxmeltRoute");
const oorbelRoutes = require("./routes/oorbellenRoute");

const store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) return next();

  User.findById(req.session.user._id).then((user) => {
    req.user = user;
    next();
  });
});

// Routes
app.use(authRoutes);
app.use(shopRoutes);
app.use(armbandRoutes);
app.use(babyRoutes);
app.use(tasRoutes);
app.use(waxRoutes);
app.use(oorbelRoutes);
app.use(adminRoutes);

// catch 404

app.use((req, res, next) => {
  res.status(404).render("error/404", {
    pageTitle: "Page Not Found",
    path: "/error404",
  });
});

module.exports = app;
