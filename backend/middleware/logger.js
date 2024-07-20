import colors from "colors";
import fs from "fs";

let start = Date.now();
const logger = (req, res, next) => {
    let reqColors = {
        GET: "green",
        POST: "yellow",
        PUT: "blue",
        DELETE: "red"
    }
    res.on("finish", () => {
    let end = Date.now();
    let today = new Date();
    let log = `${today.toLocaleDateString()} - ${req.method}  ${req.originalUrl} ${res.statusCode} ${end - start}ms`
    console.log(`${log}`[reqColors[req.method]]);
    fs.appendFile("logger.txt", `\n${log}`, () => console.log("Append log data into logger.txt file"["green"]))
  });
  next();

};

export default logger;
