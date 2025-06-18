var express = require("express");
var router = express.Router();
var Product = require("../models/Product");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
/* GET home page. */
router.get("/login", function (req, res, next) {
  return res.send("site");
  // return res.render("site/login");
});
router.post("/login", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send("register user not exist");
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (validPassword) {
    // req.session.user = user;
    return res.send("Home page");
    // return res.redirect("/");
  } else {
    return res.send("login");
    // return res.redirect("/login");
  }
});
router.get("/register", function (req, res, next) {
  return res.send("site");
  // return res.render("site/register");
});
router.get("/logout", async (req, res) => {
  req.session.user = null;
  console.log("session clear");
  return res.send("/login");
  // return res.redirect("/login");
});
router.post("/register", async function (req, res, next) {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(200).json({ message: "Register route reached 1" });
    // return res.send("User with given email already registered");
    // return res.redirect("/register");
  }
  user = new User(req.body);
  console.log("user", user);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  await user.save();
  return res.status(200).json({ message: "Register route reached" });
  // return res.send("successfully registered");
  // return res.redirect("/login");
});
router.get("/contact-us", function (req, res, next) {
  return res.send("site/contact");
  // return res.render("site/contact", { layout: "layout" });
});

module.exports = router;
