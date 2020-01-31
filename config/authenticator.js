exports.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else return res.redirect("/rest/sign-in");
};

exports.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.rest = req.rest;
  }
  next();
};
