// Modules
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

dotenv.config({ path: "./config.env" });

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

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

// Routes
app.use(authRoutes);
app.use(shopRoutes);
app.use(adminRoutes);

// catch 404

app.use((req, res, next) => {
  res.status(404).render("error/404", {
    pageTitle: "Page Not Found",
    path: "/error404",
  });
});

module.exports = app;
