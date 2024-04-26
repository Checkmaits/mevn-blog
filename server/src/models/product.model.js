const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  partNumber: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
