const mongoose = require("mongoose");

// je pakt van mongoose schema constructer
// omdat daan daar mee schemas aan te maken
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productNaam: {
    type: String,
    require: true,
  },
  productCategorie: {
    type: String,
    require: [true, "Een product moet een categorie hebben"],
  },
  productImg: {
    type: String,
    require: false,
  },
  productBeschrijving: {
    type: String,
    require: true,
  },
  productPrijs: {
    type: Number,
    require: true,
  },
  productMaat: {
    type: String,
    require: true,
  },
  productKleur: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
