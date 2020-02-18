var dayService = require("../services/day");

/**
 * Function to get a day by date from the collection.
 * If the day is not stored in db, take it from the API,
 * save it in the db and then return it.
 */
exports.find = function(req, res) {
  var params = req.params || {};
  var query = {
    day: params.day,
    month: params.month
  };
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }
  // Search the day in the db
  dayService.findDayByDate(query, function(error, response) {});
  // Ask for the day to the api
  dayService.getDay(query, function(error, response) {
    if (error) {
      res.status(404).send(error);
      return;
    }
    if (response) {
      res.status(200).send(response);
      return;
    }
    if (!response) {
      res.status(204).send("No Data Found");
    }
  });
};

class Day {
  constructor(dayData) {
    this.date = dayData.date || "";
    this.url = dayData.url || "";
    this.data = dayData.data || {};
  }
}
