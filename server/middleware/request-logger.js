module.exports = function requestLogger(req, res, next) {
  console.table({ verb: req.method, ip: req.ip, endpoint: req.path });
  next();
};
