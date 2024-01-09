const errorHandler = (err, req, res, next) => {
  res.status(500).send({
    ok: false,
    message: "An Error Occured",
    error_message: err.message,
    error: err,
  });
};
module.exports = errorHandler;
