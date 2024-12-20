const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(__dirname, "../db/todos.json");

exports.readData = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

exports.writeData = (data) => {
  return fs.writeFileSync(dbPath, JSON.stringify(data), null, 2);
};
