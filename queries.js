const db = require("./db/connection.js");

db.query(`SELECT COUNT(*) AS comment_count FROM comments WHERE article_id = 29;`)
  .then(({ rows }) => {
    console.log(rows);
  })
  .then(() => {
    db.end();
  })
  .catch((err) => {
    console.log(err);
  });
