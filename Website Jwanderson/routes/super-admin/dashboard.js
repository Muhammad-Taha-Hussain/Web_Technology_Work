const express = require("express");
let router = express.Router();
router.get("/", async (req, res) => {
  return res.send("helo");
});
module.exports = router;