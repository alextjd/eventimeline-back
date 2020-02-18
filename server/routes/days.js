var express = require("express");
var router = express.Router();
var dayCtrl = require("../controllers/day");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/**
 ** Get day by date
 **/
router.get("/day/:month/:day", dayCtrl.find);

module.exports = router;
