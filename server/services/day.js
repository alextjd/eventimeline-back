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

  exports.getDays = (foundDays, days) => {
    const parsedDays = foundDays.map((day, index) => {
      if (day) {
        return new Promise(
          day => {
            return day;
          },
          () => {}
        );
      } else {
        const query = this.parseDate(days[index]);
        return this.getDay(query);
      }
    });
    return Promise.all(parsedDays);
  };

  exports.parseDate = date => {
    return `${constants.monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  /**
   * Search the date in the database
   * @param {*} day the requested day
   */
  exports.findDayByDate = day => {
    const date = this.parseDate(day);
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
    const promises = [];
    days.forEach(day => {
      promises.push(this.findDayByDate(day));
    });
    return Promise.all(promises);
  };

  /**
   * Save a new day
   * @param {*} data day data
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
