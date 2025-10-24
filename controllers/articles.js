const {
  readArticles,
  readArticleById,
  readArticleCommentsById,
  insertCommentByArticleId,
  updateVoteCountByArticleId,
} = require("../models/articles.js");

function getArticles(req, res) {
  const { sort_by, order } = req.query;

  return readArticles(sort_by, order).then((articles) => {
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

function postCommentByArticleId(req, res) {
  const { article_id } = req.params;

  return insertCommentByArticleId(article_id, req.body).then((comment) => {
    res.status(201).send({ comment });
  });
}

function incrementVotesByArticleId(req, res) {
  const { article_id } = req.params;

  return updateVoteCountByArticleId(article_id, req.body).then((article) => {
    res.status(200).send({ article });
  });
}

module.exports = {
  getArticles,
  getArticleById,
  getArticleCommentsById,
  postCommentByArticleId,
  incrementVotesByArticleId,
};
