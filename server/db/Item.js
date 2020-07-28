const Sequelize = require("sequelize");
const db = require("./db");

const Item = db.define("item", {
  name: Sequelize.STRING,
  Url: Sequelize.STRING,
});

module.exports = Item;
