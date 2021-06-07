// Modules
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(authRoutes);
app.use(shopRoutes);

module.exports = app;
