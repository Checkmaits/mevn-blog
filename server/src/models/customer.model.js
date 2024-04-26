const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  passwordHash: {
    type: String,
  },
  address: {
    type: mongoose.Types.ObjectId,
    ref: "Address",
  },
});

module.exports = mongoose.model("Customer", customerSchema);
