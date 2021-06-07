const mongoose = require("mongoose");

// je pakt van mongoose schema constructer
// omdat daan daar mee schemas aan te maken
const Schema = mongoose.Schema;

const productSchema = new Schema({
  ProductNaam: {
    type: String,
    require: true,
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
});

module.exports = mongoose.model("Producten", productSchema);
