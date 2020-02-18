var mongoose = require("mongoose");

var URL = process.env.URL || "mongodb://localhost/EVENTIMELINE_DB";
mongoose.set("useCreateIndex", true);

// Make mongoose use findOneAndUpdate() (defaults to false)
mongoose.set("useFindAndModify", false);

// Connect
mongoose.connect(URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Models
var db = mongoose.connection;

// Connection callbacks
db.on("error", () => {
  console.error("Error occured in databaseb connection");
});
db.on("open", () => {
  console.log("Database Connection established successfully");
});
