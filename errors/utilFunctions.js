function throwErrorIfEmpty(rows) {
    if (rows.length === 0) {
        const err = new Error("Not found");
        err.status = 404;
        throw err;
    };
};

module.exports = { throwErrorIfEmpty }