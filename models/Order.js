const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      default: 0
    },
    credit: {
      type: Number,
      default: 0
    },
    rest: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

mongoose.exports = mongoose.model("Order", orderSchema);
