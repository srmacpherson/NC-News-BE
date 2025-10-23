const {
  readArticles,
  readArticleById,
  readArticleCommentsById,
} = require("../models/articles.js");

function getArticles(req, res) {
  return readArticles().then((articles) => {
    res.status(200).send({ articles });
  });
}

function getArticleById(req, res) {
  const { article_id } = req.params;
  
  return readArticleById(article_id).then((article) => {
    res.status(200).send({ article });
  });
}

function getArticleCommentsById(req, res) {
  const { article_id } = req.params;

  return readArticleCommentsById(article_id).then((comments) => {
    res.status(200).send({ comments });
  });
}

module.exports = { getArticles, getArticleById, getArticleCommentsById };
