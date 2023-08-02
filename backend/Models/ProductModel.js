const mongoose = require("mongoose");

const productScehma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
  rating: {
    type: Number,
  },
 
  image: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Product", productScehma);
