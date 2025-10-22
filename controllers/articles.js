const { readArticles, readArticleById } = require("../models/articles.js");

function getArticles(req, res) {
  return readArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

function getArticleById(req, res, next) {
  const { article_id } = req.params;

  const parsedId = Number(article_id);
  if (!Number.isInteger(parsedId)) {
    return res.status(400).send({ msg: "Invalid input" });
  }

  return readArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticles, getArticleById };
