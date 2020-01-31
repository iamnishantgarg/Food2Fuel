const mongoose = require("mongoose");
const restSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz enter name of rest"]
  },
  address: {
    type: String,
    required: [true, "plz enter address of rest"]
  },
  phone: {
    type: Number,
    min: 10,
    max: 10
  },
  email: { type: String, required: [true, "pla enter email"] },
  gstin: { type: String },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
  credit: { type: Number, default: 0 }
});
module.exports = mongoose.model("rest", restSchema);
