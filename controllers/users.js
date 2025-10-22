const { readUsers } = require("../models/users.js");

function getUsers(req, res) {
    readUsers()
    .then((users) => {
        return res.status(200).send({ users });
    });
};

module.exports = { getUsers }