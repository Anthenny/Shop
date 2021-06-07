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
  password: {
    type: String,
    required: [true, "Elke gebruiker moet een wachtwoord hebben"],
  },
  cart: {
    itmes: [{ productId: { type: Schema.Types.ObjectId }, quantity: { type: Number, required: true } }],
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
