const fs = require("node:fs");

function logger(string) {
  if (typeof string !== "string") {
    string = JSON.stringify(string);
  }
  fs.appendFileSync("output.txt", string + "\n", "utf8");
}

module.exports = logger;
