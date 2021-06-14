const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Elke gebruiker moet een naam hebben"],
  },
  email: {
    type: String,
    required: [true, "Elke gebruiker moet een email hebben"],
  },
  adres: {
    type: String,
    required: [true, "Elke gebruiker moet een adres hebben"],
  },
  plaats: {
    type: String,
    required: [true, "Elke gebruiker moet een plaats hebben"],
  },
  password: {
    type: String,
    required: [true, "Elke gebruiker moet een wachtwoord hebben"],
  },
  cart: {
    itmes: [
      {
        productId: { type: Schema.Types.ObjectId },
        quantity: { type: Number, required: true },
      },
    ],
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.addToCart = function (product) {
  // je check of de product als bestaat door de product_id van cart naar een string te zetten
  // en dan checken of die gelijk is met de product_id van product zelf
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;

  // je kopeerd card itmes
  const updatedCartitems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartitems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartitems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }
  // hier verander je die leggen items naar geupdateItems
  const updatedCart = {
    items: updatedCartitems,
  };
  // je verander de card naar updatedCard
  // als er niks daan word product toegevoegt als wel dan check of hij als bestaat
  // + 1 Quantity ander make hij nieuw aan
  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
