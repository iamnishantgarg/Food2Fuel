const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/rest");

// auth using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      Rest.findOne({ email: email }, (err, rest) => {
        if (err) {
          console.log("error in finding user" + err);
          return done(err);
        }
        if (!rest || rest.password != password) {
          console.log("invalid username/password");
          return done(null, false);
        }
        return done(null, rest);
      });
    }
  )
);

// serialize user to define cookie
passport.serializeUser((rest, done) => {
  done(null, rest.id);
});

// deserializeUser here
passport.deserializeUser((id, done) => {
  User.findById(id, (err, rest) => {
    if (err) {
      console.log("error in finding user passport-->");
      return done(err);
    }
    return done(null, rest);
  });
});

module.exports = passport;
