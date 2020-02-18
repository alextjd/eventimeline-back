(function() {
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
  exports.getDay = function(query, callback) {
    https
      .get(`${baseUrl}/${query.month}/${query.day}`, res => {
        var data = "";
        res.on("data", chunk => {
          data += chunk;
        });
        res.on("end", () => {
          callback(null, data);
        });
      })
      .on("error", err => {
        console.log("Error regarding the external API: " + err.message);
      });
  };

  /**
   * Search the date in the database
   * @param {*} query the requested day
   * @param {*} callback callback function
   */
  exports.findDayByDate = function(query, callback) {
    var date = `${constants.monthNames[query.month]} ${query.day}`;
    dayModel.findOne({ date }).then(
      res => {
        callback(null, res);
      },
      error => {
        callback(error, null);
      }
    );
  };

  /**
   * Save a new day
   * @param {*} data day data
   * @param {*} callback callback function
   */
  exports.saveDay = function(data, callback) {
    dayModel.create(data).then(
      res => {
        callback(null, res);
      },
      error => {
        callback(error, null);
      }
    );
  };
})();
