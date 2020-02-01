exports.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else return res.redirect("/rest/register");
};

exports.checkAdmin = function(req , res, next){

  if(req.isAuthenticated() && req.user.isAdmin == true ){
    next();
  }
  else{
    return res.redirect('back');
  }
}

exports.setAuthenticatedUser = (req, res, next) => {
  //   console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.locals.user = req.user;
  }
  next();
};
