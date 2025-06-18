var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("site/myaccount");
  // res.render("site/myaccount");
});

module.exports = router;