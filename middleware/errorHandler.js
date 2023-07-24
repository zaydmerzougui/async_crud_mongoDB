const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(err.stack, "errLog.txt");
  res.status(500).send(err.message);
  next();
};

module.exports = errorHandler;
