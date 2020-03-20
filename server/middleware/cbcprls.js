const key = "cbcprls";

module.exports = cbcprls = (req, res, next) => {
  const isWorthy = req.headers.cbcprls === key;
  console.log(req.headers.cbcprls, key);

  if (isWorthy) {
    return next();
  } else {
    res
      .status(401)
      .send({ cbcprls: "You are not worthy of having access to this API." });
  }
};
