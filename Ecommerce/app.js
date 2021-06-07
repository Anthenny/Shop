// Modules

// const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// dotenv.config({ path: "./config.env" });

const shopRoutes = require("./routes/shop");
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(shopRoutes);

module.exports = app;
