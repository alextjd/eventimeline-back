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
        return day;
      } else {
        return this.getDay({
          month: days[index].getMonth() + 1,
          day: days[index].getDate()
        }).then(res => {
          return this.saveDay(res);
        });
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
   * @param {*} day day data
   */
  exports.saveDay = day => {
    return new Promise((resolve, reject) => {
      dayModel.create(day, (err, data) => {
        if (err) {
          return reject("No db connection");
        }
        return resolve(data);
      });
    });
  };

  exports.saveDays = days => {
    days.forEach(day => {});
  };
})();
