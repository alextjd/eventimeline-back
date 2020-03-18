const dayService = require("../services/day");
const constants = require("../shared/constants/constants");

/**
 * Function to get a day by date from the collection.
 * If the day is not stored in db, take it from the API,
 * save it in the db and then return it.
 */
exports.find = (req, res) => {
  const range = req.query || {};
  const query = {
    start: range.start,
    end: range.end
  };
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  let days;
  try {
    days = dayService.getDaysInterval(range);
  } catch (error) {
    res.status(400).send(constants.error.invalidRange);
  }

  dayService
    .findDaysByDate(days)
    .then(days => {
      if (days.some(day => day === null)) {
        dayService.getDaysInterval(days);
      }
    })
    .catch(err => {
      console.log(err);
    });

  return;
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
