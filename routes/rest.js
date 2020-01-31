const router = require("express").Router();
const restController = require("../controllers/rest");
router.get("/login", restController.getSignin);
router.get("/register", restController.getSignup);
router.get("/dashboard", restController.getDashboard);
module.exports = router;
