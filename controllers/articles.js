const { readArticles, readArticleById, readArticleCommentsById } = require("../models/articles.js");

function getArticles(req, res) {
  return readArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

function getArticleById(req, res) {
  const { article_id } = req.params;

  const parsedId = Number(article_id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Invalid input" });
  }

  return readArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  });
}

function getArticleCommentsById(req, res) {
  const { article_id } = req.params;

  const parsedId = Number(article_id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "Invalid input" });
  }

  return readArticleCommentsById(article_id)
  .then((comments) => {
    res.status(200).send({ comments });
  })
}

module.exports = { getArticles, getArticleById, getArticleCommentsById };
