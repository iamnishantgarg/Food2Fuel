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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
