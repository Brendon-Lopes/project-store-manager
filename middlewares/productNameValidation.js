const httpStatusCode = require('../helpers/httpStatusCode');
const { nameValidation } = require('../schemas/productSchema');

const productNameValidation = (req, res, next) => {
  const { name } = req.body;

  const { error } = nameValidation.validate(name);

  if (error) {
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .json({ message: error.message });
  }

  next();
};

module.exports = productNameValidation;
