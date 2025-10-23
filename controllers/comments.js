const { deleteCommentById } = require("../models/comments.js");

function removeCommentById(req, res) {
    const { comment_id } = req.params;
    return deleteCommentById(comment_id).then(() => {
        res.status(204).send({});
    });
};

module.exports = { removeCommentById };
