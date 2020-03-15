var express = require("express");
var router = express.Router();
var dayCtrl = require("../controllers/day");

/**
 ** Get day by date
 **/
router.get("/", dayCtrl.find);

module.exports = router;
