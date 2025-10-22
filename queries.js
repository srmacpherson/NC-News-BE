const db = require("./db/connection.js");

db.query(`SELECT * from articles;`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .then(() => {
    db.end();
  })
  .catch((err) => {
    console.log(err);
  });
