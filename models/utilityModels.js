const db = require("../db/connection.js");

function isValidColumn(columnName, table) {
  return db.query(`SELECT * FROM ${table}`).then(({ rows }) => {
    if (!rows[0][columnName]) {
      const err = new Error("Invalid input");
      err.status = 400;
      throw err;
    }
  });
}

module.exports = { isValidColumn };
