exports.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else return res.redirect("/rest/register");
};

exports.setAuthenticatedUser = (req, res, next) => {
  //   console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.locals.user = req.user;
  }
  next();
};
