const httpStatusCode = require('../helpers/httpStatusCode');
const { nameLengthValidation } = require('../schemas/productSchema');

const productNameValidation = (req, res, next) => {
  const { name } = req.body;

  const { error } = nameLengthValidation.validate(name);

  if (error) {
    return res
      .status(httpStatusCode.UNPROCESSABLE_ENTITY)
      .json({ message: error.message });
  }

  next();
};

module.exports = productNameValidation;
