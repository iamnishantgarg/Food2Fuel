const router = require("express").Router();
const passport = require("passport");
const authenticator = require("../config/authenticator");
const restController = require("../controllers/rest");
// router.get("/login", restController.getSignin);
router.get("/register", restController.getSignup);
router.get(
  "/dashboard",
  authenticator.checkAuthentication,
  restController.getDashboard
);
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/rest/register"
  }),
  restController.getSignin
);
router.post("/register", restController.postSignup);
module.exports = router;
