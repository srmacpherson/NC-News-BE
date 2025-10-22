const { readTopics } = require("../models/topics.js");

function getTopics(req, res) {
  return readTopics().then((topics) => {
    res.status(200).send({ topics });
  });
}

module.exports = { getTopics };
