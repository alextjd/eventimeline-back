const dayService = require("../services/day");

/**
 * Function to get a day by date from the collection.
 * If the day is not stored in db, take it from the API,
 * save it in the db and then return it.
 */
exports.find = (req, res) => {
  const params = req.params || {};
  const query = {
    day: params.day,
    month: params.month
  };
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  dayService
    .findDayByDate(query)
    .then(data => {
      if (!data) {
        return dayService.getDay(query);
      }
      res.status(200).send(data);
    })
    .then(data => {
      if (!data) {
        res.status(503).send("Api service unavailable");
      }
      return dayService.saveDay(data);
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(error);
    });
};
