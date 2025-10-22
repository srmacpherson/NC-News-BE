const { readArticles, readArticleById } = require("../models/articles.js");

function getArticles(req, res) {
  return readArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  return readArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticles, getArticleById };
