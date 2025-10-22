const { readUsers } = require("../models/users.js");

function getUsers(req, res) {
  return readUsers().then((users) => {
    res.status(200).send({ users });
  });
}

module.exports = { getUsers };
