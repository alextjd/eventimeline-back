(function() {
  var https = require("https");
  var mongoose = require("mongoose");
  var day = mongoose.model("Day");

  const baseUrl = "https://history.muffinlabs.com/date";

  /**
   * Get a specific day by date
   * @param {*} query the requested day
   * @param {*} callback callback function
   */
  exports.findDay = function(query, callback) {
    https
      .get(`${baseUrl}/${query.month}/${query.day}`, res => {
        let data = "";
        res.on("data", chunk => {
          data += chunk;
        });
        res.on("end", () => {
          callback(null, data);
        });
      })
      .on("error", err => {
        console.log("Error: " + err.message);
      });
  };

  /**
   * Save a new day
   * @param {*} data day data
   * @param {*} callback callback function
   */
  exports.createDay = function(data, callback) {
    day.create(data).then(
      res => {
        callback(null, res);
      },
      error => {
        callback(error, null);
      }
    );
  };
})();
