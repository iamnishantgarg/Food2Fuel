exports.getSignin = (req, res, next) => {
  return res.send("this is login");
};
exports.getSignup = (req, res, next) => {
  return res.render("signup");
};

exports.postSignup = (req, res, next) => {
  //enter code for signup
};
exports.getDashboard = (req, res, next) => {
  return res.send("this is dashboard ");
};
