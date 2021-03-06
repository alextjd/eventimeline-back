const define = (name, value) => {
  Object.defineProperty(exports, name, {
    value: value,
    enumerable: true
  });
};

define("monthNames", [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]);

define("error", {
  invalidRange: "The dates range provided is invalid."
});
