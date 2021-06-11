const mongoose = require("mongoose");

// je pakt van mongoose schema constructer
// omdat daan daar mee schemas aan te maken
const Schema = mongoose.Schema;

const productSchema = new Schema({
  ProductNaam: {
    type: String,
    require: true,
  },
  ProductCategorie: {
    type: String,
    require: [true, "Een product moet een categorie hebben"],
  },
  ProductImg: {
    type: String,
    require: false,
  },
  ProductBeschrijving: {
    type: String,
    require: true,
  },
  ProductPrijs: {
    type: Number,
    require: true,
  },
  ProductMaat: {
    type: String,
    require: true,
  },
  ProductKleur: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
