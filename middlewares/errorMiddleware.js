const httpStatusCode = require('../helpers/httpStatusCode');

const errorMiddleware = (err, req, res, _next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ message: err.message, code: err.code });
  }

  return res.status(httpStatusCode.INTERNAL_SERVER).json({ message: err.message });
};

module.exports = errorMiddleware;
