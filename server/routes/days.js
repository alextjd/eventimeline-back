var express = require("express");
var router = express.Router();
var dayCtrl = require("../controllers/day");

/**
 ** Get day by date
 **/
router.get("/day/:date", dayCtrl.get);

/**
 ** Create new day
 **/
router.post("/", dayCtrl.create);

module.exports = router;
