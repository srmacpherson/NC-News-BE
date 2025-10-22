function handleCustomErrors(err, req, res, next) {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

function handleServerErrors(err, req, res, next) {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = { handleCustomErrors, handleServerErrors }