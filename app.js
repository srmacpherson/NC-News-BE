const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.js");
const { getArticles, getArticleById, getArticleCommentsById } = require("./controllers/articles.js");
const { getUsers } = require("./controllers/users.js");
const { handleCustomErrors, handleServerErrors } = require("./errors/handleCustomErrors.js");

app.get("/api/topics", getTopics);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleCommentsById);
app.get("/api/users", getUsers);

app.use((req, res) => {
    res.status(404).send({ msg: "Path Not Found" })
})

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
