const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const requestLogger = require("./server/middleware/request-logger");
const cbcprls = require("./server/middleware/cbcprls");

// Models
require("./server/models/day");

// Routes
const indexRouter = require("./server/routes/index");
const daysRouter = require("./server/routes/days");

// Config files
require("./server/config/connection");

const app = express();

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

app.use("/", indexRouter);
app.use("/api/days", daysRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
