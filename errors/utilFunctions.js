function throwErrorIfEmpty(rows) {
    if (rows.length === 0) {
        const err = new Error("Not found");
        err.status = 404;
        throw err;
    };
};

function throwErrorIfNaN(possibleNum) {
    const parsedId = Number(possibleNum);
  if (isNaN(parsedId)) {
    const err = new Error("Invalid input");
    err.status = 400;
    throw err;
  }
}

function throwErrorIfNotAnOrder(order) {
  const validOrders = {
            asc: 'valid',
            desc: 'valid',
            ASC: 'valid',
            DESC: 'valid',
        }

  if (order && validOrders[order]) {
        return true;
      } else {
        const err = new Error("Invalid input");
        err.status = 400;
        throw err;
      }
}

module.exports = { throwErrorIfEmpty, throwErrorIfNaN, throwErrorIfNotAnOrder }