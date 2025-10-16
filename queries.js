const db = require("./db/connection.js");

db.query(`SELECT * FROM comments WHERE votes > 10;`)
.then(({rows}) => {
    console.log(rows);
})
.then(() => {
    db.end()
})
.catch((err) => {
    console.log(err);
})
