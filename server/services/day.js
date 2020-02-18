(() => {
  var https = require("https");
  var mongoose = require("mongoose");
  var dayModel = mongoose.model("Day");
  var constants = require("../shared/constants/constants");

  var baseUrl = "https://history.muffinlabs.com/date";

  /**
   * Get a specific day by date from the API
   * @param {*} query the requested day
   * @param {*} callback callback function
   */
  exports.getDay = query => {
    return new Promise((resolve, reject) => {
      https
        .get(`${baseUrl}/${query.month}/${query.day}`, res => {
          var data = "";
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
   * @param {*} query the requested day
   * @param {*} callback callback function
   */
  exports.findDayByDate = query => {
    var date = `${constants.monthNames[query.month]} ${query.day}`;
    return new Promise((resolve, reject) => {
      dayModel.findOne({ date }, (err, data) => {
        if (err) {
          return reject("No db connection");
        }
        return resolve(data);
      });
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
