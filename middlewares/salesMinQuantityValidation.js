const httpStatusCode = require('../helpers/httpStatusCode');
const { validateQuantity } = require('../schemas/salesSchema');

const salesMinQuantityValidation = (req, res, next) => {
  const sales = req.body;
  let message = '';

  const invalid = sales.some(({ quantity }) => {
    const { error } = validateQuantity.validate(quantity);
    if (error) {
      message = error.message;
      return true;
    }
    return false;
  });

  if (invalid) return res.status(httpStatusCode.UNPROCESSABLE_ENTITY).json({ message });

  next();
};

module.exports = salesMinQuantityValidation;
