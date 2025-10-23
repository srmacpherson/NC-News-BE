const db = require("../db/connection.js");
const { throwErrorIfNaN, throwErrorIfEmpty } = require("../errors/utilFunctions.js");

function deleteCommentById(comment_id) {
  throwErrorIfNaN(comment_id);
  return db
    .query(`DELETE FROM emojis WHERE emojis.comment = $1;`, [comment_id])
    .then(() => {
        return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*;`, [comment_id])
    })
    .then(({ rows }) => {
        throwErrorIfEmpty(rows)
      return rows;
    });
}

module.exports = { deleteCommentById };
