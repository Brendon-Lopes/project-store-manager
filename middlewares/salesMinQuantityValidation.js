const httpStatusCode = require('../helpers/httpStatusCode');
const { validateQuantity } = require('../schemas/salesSchema');

const salesMinQuantityValidation = (req, res, next) => {
  const sales = req.body;

  const { error } = validateQuantity.validate(sales);

  if (error) {
    console.log(error);
    return res
      .status(httpStatusCode.UNPROCESSABLE_ENTITY).json({ message: error.message });
  }

  next();
};

module.exports = salesMinQuantityValidation;
