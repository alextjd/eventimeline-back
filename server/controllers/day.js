const dayService = require("../services/day");
const constants = require("../shared/constants/constants");
const { ErrorHandler } = require("../shared/helpers/error");

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
    throw new ErrorHandler(404, constants.error.invalidRange);
  }

  dayService
    .findDaysByDate(days)
    .then(data => {
      return dayService.getDays(data, days);
    })
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      throw new ErrorHandler(404, error);
    });
  return;
};
