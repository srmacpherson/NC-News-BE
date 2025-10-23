const db = require("../db/connection.js");
const { throwErrorIfEmpty } = require("../errors/utilFunctions.js");

function readArticles() {
  return db
    .query(
      `SELECT 
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
        articles.article_id
        ORDER BY 
        articles.created_at DESC;`
    )
    .then(({ rows }) => {
      return rows;
    });
}

function readArticleById(article_id) {
  const parsedId = Number(article_id);
  if (isNaN(parsedId)) {
    const err = new Error("Invalid input");
    err.status = 400;
    throw err;
  }
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      throwErrorIfEmpty(rows);
      return rows[0];
    });
}

function readArticleCommentsById(article_id) {
  const parsedId = Number(article_id);
  if (isNaN(parsedId)) {
    const err = new Error("Invalid input");
    err.status = 400;
    throw err;
  }
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

module.exports = { readArticles, readArticleById, readArticleCommentsById };
