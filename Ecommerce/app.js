// Modules

const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

dotenv.config({ path: "./config.env" });

const shopRoutes = require("./routes/shop");
const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(shopRoutes);

// app punt listen Routes css in public file stoppen. ejs bestanden maken.shopController EJS?

// css filve verplaatsen in public anders error
// producten.html veranderen in oorbellen.html anders error.
// Fotos aanpassen in scss index.html zodat mobiel werkt

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
