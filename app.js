const express = require("express");
const mongoose = require("mongoose");
const keys = require("./keys");
const app = express();
// const authe
const expressLayout = require("express-ejs-layouts");
// const passportLocalMongoose = require("passport-local-mongoose");
// const LocalStrategy = require("passport-local");
// const passport = require("passport");
const restRouter = require("./routes/rest");
const User = require("./models/User");
const Order = require("./models/Order");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

// const passportLocal = require("./config/passport-local-strategy");
const Authenticator = require("./config/authenticator");

app.use(express.json());
app.use(express.urlencoded());

app.use(express.static("./public"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// // app.use(expressLayout);

app.set("view engine", "ejs");
app.use(
  session({
    name: "codeialdwqd",
    secret: "blashwfejbfwejf",
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.locals.user = req.user;
  }
  next();
});

app.use("/rest", restRouter);

// app.use(
//   require("express-session")({
//     secret: "hey there",
//     resave: false,
//     saveUninitialized: false
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.post(
//   "/rest/signin",
//   passport.authenticate("local", {
//     successRedirect: "/rest/dashboard",
//     failureRedirect: "/rest/register"
//   }),
//   (req, res) => {}
// );

app.get("/logout", (req,res)=>{
  req.logout();
  res.redirect("/rest/register")
})
app.get("/products", (req,res)=>{
  res.render("products")
})
app.get("/unsubscribe", (req,res)=>{
  User.findOneAndRemove({_id: req.user._id}, (err)=>{
    if(err){
      console.log(err);
      res.redirect("/rest/register")
    }else{
      res.redirect("/");
    }
  })
})

app.post("/order", async (req, res) => {
  User.findById(req.user.id, (err, user) => {
    // console.log(user);
    if (user) {
      Order.create({
        quantity: req.body.quantity,
        credit: req.body.quantity * 10,
        user: req.user
      })
        .then(order => {
          console.log(req.body);
          user.date = new Date().getTime() + 604800000;

          user.isActive = true;
          user.orders.push(order);
          user.save();

          res.redirect("/rest/dashboard");
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

app.get("/admin", (req, res) => {
  Order.find({ isActive: true })
    .populate("user")
    .exec((err, orders) => {
      console.log(orders);
      res.render("admin", { orders });
    });
});

app.get("/order/:id", (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if (err) {
      console.log(err);
      return;
    } else {
      if (order) {
        User.findById(order.user, (err, user) => {
          if (err) {
            console.log(err);
            return res.redirect("/");
          }
          user.credit = user.credit + order.credit;
          user.isActive = false;
          order.isActive = false;
          user.save().then(() => {
            order.save().then(() => {
              return res.redirect("/admin");
            });
          });
        });
      } else {
        console.log("NO order found");
        res.redirect("/");
      }
    }
  });
});

app.use("/", (req, res) => {
  return res.render("index");
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
