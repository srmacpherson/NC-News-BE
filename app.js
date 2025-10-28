const express = require("express");
const app = express();
const { getArticles, getArticleById, getArticleCommentsById, postCommentByArticleId, incrementVotesByArticleId } = require("./controllers/articles.js");
const { removeCommentById } = require("./controllers/comments.js");
const { getTopics } = require("./controllers/topics.js");
const { getUsers } = require("./controllers/users.js");
const { handlePathNotFound } = require("./errors/pathNotFound.js");
const { handleCustomErrors, handleServerErrors, handlePSQLErrors } = require("./errors/handleCustomErrors.js");

app.use(express.json());
app.use("/api", express.static('public'));

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleCommentsById);
app.get("/api/users", getUsers);
app.post("/api/articles/:article_id/comments", postCommentByArticleId);
app.put("/api/articles/:article_id", incrementVotesByArticleId);
app.delete("/api/comments/:comment_id", removeCommentById);
app.all("/*invalid-path", handlePathNotFound);

app.use(handlePSQLErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
