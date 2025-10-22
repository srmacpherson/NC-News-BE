const db = require("../db/connection.js");

function readUsers() {
    return db.query(`SELECT * FROM users;`)
    .then(({rows}) => {
        return rows;
    });
}

module.exports = { readUsers }