var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");
var restSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {
    type: String,
    required: true
  },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "order" }],
  credit: { type: Number, default: 0 },
  date: { type: Date },
  isActive: { type: Boolean, default: false },
  isAdmin : {type: Boolean , default : false }
});
// restSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", restSchema);
