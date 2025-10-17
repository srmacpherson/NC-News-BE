const db = require("./db/connection.js");

db.query(`SELECT * FROM emojis;`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .then(() => {
    db.end();
  })
  .catch((err) => {
    console.log(err);
  });
