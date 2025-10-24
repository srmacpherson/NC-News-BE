const db = require("../db/connection.js");
const { isValidColumn } = require("./utilityModels.js");
const {
  throwErrorIfEmpty,
  throwErrorIfNaN,
  throwErrorIfNotAnOrder,
} = require("../errors/utilFunctions.js");

function readArticles(sort_by, order) {
  let queryStr = `SELECT 
        articles.author, 
        articles.title, 
        articles.article_id, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url, 
        COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY 
        articles.article_id`;

  if (sort_by && isValidColumn(sort_by)) {
      queryStr += ` ORDER BY ${sort_by}`;
      if (throwErrorIfNotAnOrder(order)) {
        queryStr += ` ${order}`;
      }
      return db.query(queryStr).then(({ rows }) => {
        return rows;
      });
  } else {
    queryStr += " ORDER BY created_at DESC";
  }
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
}

function readArticleById(article_id) {
  throwErrorIfNaN(article_id);
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      throwErrorIfEmpty(rows);
      return rows[0];
    });
}

function readArticleCommentsById(article_id) {
  throwErrorIfNaN(article_id);
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`,
      [article_id]
    )
    .then(({ rows }) => {
      throwErrorIfEmpty(rows);
      return rows;
    });
}

function insertCommentByArticleId(article_id, input) {
  throwErrorIfNaN(article_id);
  const { username, body } = input;
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ((SELECT username FROM users WHERE username = $1), $2, $3) RETURNING *;`,
      [username, body, article_id]
    )
    .then(({ rows }) => {
      throwErrorIfEmpty(rows);
      return rows[0];
    });
}

function updateVoteCountByArticleId(article_id, input) {
  throwErrorIfNaN(article_id);
  const { inc_votes } = input;
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,
      [inc_votes, article_id]
    )
    .then(({ rows }) => {
      throwErrorIfEmpty(rows);
      return rows[0];
    });
}

module.exports = {
  readArticles,
  readArticleById,
  readArticleCommentsById,
  insertCommentByArticleId,
  updateVoteCountByArticleId,
};
