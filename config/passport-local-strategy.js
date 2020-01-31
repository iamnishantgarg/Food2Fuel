const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

// auth using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    (email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          console.log("error in finding user" + err);
          return done(err);
        }
        if (!user || user.password != password) {
          console.log("invalid username/password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialize user to define cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserializeUser here
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.log("error in finding user passport-->");
      return done(err);
    }
    return done(null, user);
  });
});

module.exports = passport;
