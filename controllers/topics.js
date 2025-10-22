const { readTopics } = require("../models/topics.js");

function getTopics(req, res) {
   readTopics().then((topics) => {
    return res.status(200).send({ topics: topics });
  });
}

module.exports = { getTopics };
