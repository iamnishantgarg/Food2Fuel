const express = require("express");
const mongoose = require("mongoose");
const keys = require("./keys");
const app = express();
const session = require("express-session");
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const restRouter = require("./routes/rest");
const passportLocal = require("./config/passport-local-strategy");
const Authenticator = require("./config/authenticator");

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("./public"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// app.use(expressLayout);

app.set("view engine", "ejs");

app.use(
  session({
    name: "codeial",
    secret: "blashwfejbfwejf",
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(Authenticator.setAuthenticatedUser);

app.use("/rest", restRouter);
app.use("/", (req, res) => {
  return res.send("hello from server");
});

mongoose.connect(
  keys.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    app.listen(keys.PORT, () => {
      console.log(`listening to port:${keys.PORT}`);
    });
  }
);
