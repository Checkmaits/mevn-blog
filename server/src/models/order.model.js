const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "Customer",
  },
  items: [orderItemSchema],
});

module.exports = mongoose.model("Order", orderSchema);
