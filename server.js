const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const requestLogger = require("./server/middleware/request-logger");
const cbcprls = require("./server/middleware/cbcprls");
const { handleError } = require("./server/shared/helpers/error");

// App initialization
const app = express();

// Models
require("./server/models/day");

// CORS setup
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
const indexRouter = require("./server/routes/index");
const daysRouter = require("./server/routes/days");

// Config files
require("./server/config/connection");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(requestLogger);
app.use(cbcprls);

// Routing definitions
app.use("/", indexRouter);
app.use("/api/days", daysRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
