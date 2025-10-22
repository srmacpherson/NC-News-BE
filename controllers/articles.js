const { readArticles } = require("../models/articles.js");

function getArticles(req, res) {
    readArticles()
    .then((articles) => {
        return res.status(200).send({ articles })
    })
}

module.exports = { getArticles }