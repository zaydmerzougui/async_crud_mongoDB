const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

const logEvents = async (msg, fileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t ${uuid()}\t ${msg}\n`;
  try {
    if (!fs.existsSync("./logs")) {
      fs.mkdir("./logs", (err) => {
        if (err) throw err;
      });
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", fileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};
const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "log.txt");
  next();
};
module.exports = { logEvents, logger };
