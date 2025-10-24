function handlePSQLErrors(err, req, res, next) {
  if (err.code === '23503') {
    res.status(404).send({msg: "Not found"});
  } else next(err);
}

function handleCustomErrors(err, req, res, next) {
  if (err.status) {
    res.status(err.status).send({ msg: err.message });
  } else next(err);
};

function handleServerErrors(err, req, res, next) {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { handleCustomErrors, handleServerErrors, handlePSQLErrors }