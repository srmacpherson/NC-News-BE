const db = require("../db/connection.js");

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
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        const err = new Error("Not found"); 
        err.status = 404;
        throw err;
      } else {
        return rows[0];
      }
    });
}

function readArticleCommentsById(article_id) {
    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;`, [article_id])
    .then(({rows}) => {
        return rows;
    })
}

module.exports = { readArticles, readArticleById, readArticleCommentsById };
