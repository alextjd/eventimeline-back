var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  date: String,
  url: String,
  data: {
    Events: {
      year: String,
      html: String,
      text: String,
      links: [
        {
          title: String,
          link: String
        }
      ]
    },
    Births: {
      year: String,
      html: String,
      text: String,
      links: [
        {
          title: String,
          link: String
        }
      ]
    },
    Deaths: {
      year: String,
      html: String,
      text: String,
      links: [
        {
          title: String,
          link: String
        }
      ]
    }
  }
});

var day = new mongoose.model("Day", schema);

module.exports = day;
