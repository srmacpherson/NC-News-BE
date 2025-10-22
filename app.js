const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.js");
const { getArticles } = require("./controllers/articles.js");
const { getUsers } = require("./controllers/users.js");

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

module.exports = app;