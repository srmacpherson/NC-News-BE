function pathNotFound(req, res) {
    return res.status(404).send({ msg: "Path Not Found" });
};

module.exports = { pathNotFound }