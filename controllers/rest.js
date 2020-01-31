const User = require("../models/User");
const Order = require("../models/Order");
exports.getSignin = (req, res, next) => {
  return res.redirect("/rest/dashboard");
};
exports.getSignup = (req, res, next) => {
  return res.render("signup");
};

exports.postSignup = (req, res, next) => {
  const { name, email, phone, address, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    console.log("password did not match");
    return res.redirect("back");
  }
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log("error in findng user" + err);
      return;
    }
    var today = new Date();
    // console.log(today);
    if (!user) {
      User.create(
        {
          name,
          email,
          address,
          password,
          credit: 0,
          orders: [],
          phone,
          date: today
        },
        (err, usr) => {
          if (err) {
            console.log("error in creating user:" + err);
            return res.redirect("back");
          }
          console.log("user created successfuly");
          return res.redirect("back");
        }
      );
    }
  });
};
exports.getDashboard = (req, res, next) => {
  Order.find({ user: req.user, isActive: false }, (err, orders) => {
    if (err) {
      console.log(err);
    } else {
      return res.render("dashboard", { orders });
    }
  });
};
