const db = require("../db/connection.js");

function readTopics() {
    return db.query(`SELECT slug, description FROM topics;`)
    .then(({rows}) => {
        return rows;
    })
}

module.exports = { readTopics }