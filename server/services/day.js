(() => {
  const https = require("https");
  const mongoose = require("mongoose");
  const dayModel = mongoose.model("Day");
  const constants = require("../shared/constants/constants");
  const eachDayOfInterval = require("date-fns/eachDayOfInterval");

  const baseUrl = "https://history.muffinlabs.com/date";

  /**
   * Get a specific day by date from the API
   * @param {*} query the requested day
   * @param {*} callback callback function
   */
  exports.getDay = query => {
    return new Promise((resolve, reject) => {
      https
        .get(`${baseUrl}/${query.month}/${query.day}`, res => {
          let data = "";
          res.on("data", chunk => {
            data += chunk;
          });
          res.on("end", () => {
            return resolve(JSON.parse(data));
          });
        })
        .on("error", err => {
          return reject(err);
        });
    });
  };

  /**
   * Search the date in the database
   * @param {*} day the requested day
   * @param {*} callback callback function
   */
  exports.findDayByDate = day => {
    const date = `${constants.monthNames[day.getMonth()]} ${day.getDate()}`;
    return new Promise((resolve, reject) => {
      dayModel.findOne({ date }, (err, data) => {
        if (err) {
          return reject("No db connection");
        }
        return resolve(data);
      });
    });
  };

  exports.getDaysInterval = range => {
    return eachDayOfInterval({
      start: new Date(range.start),
      end: new Date(range.end)
    });
  };

  exports.findDaysByDate = days => {
    days.forEach(day => {
      this.findDayByDate(day);
    });
  };

  /**
   * Save a new day
   * @param {*} data day data
   * @param {*} callback callback function
   */
  exports.saveDay = data => {
    return new Promise((resolve, reject) => {
      dayModel.create(data, (err, data) => {
        if (err) {
          return reject("No db connection");
        }
        return resolve(data);
      });
    });
  };
})();
