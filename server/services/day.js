(function() {
  var mongoose = require("mongoose");
  var day = mongoose.model("Day");

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

  /**
   * Get a specific day by date
   * @param {*} query the requested day
   * @param {*} callback callback function
   */
  exports.findDay = function(query, callback) {
    day.findOne(query, callback);
  };
})();
