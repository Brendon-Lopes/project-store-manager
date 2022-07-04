const httpStatusCode = require('../helpers/httpStatusCode');
const { validateProducts } = require('../schemas/salesSchema');

const salesRequiredFields = (req, res, next) => {
  const sales = req.body;

  const { error } = validateProducts.validate(sales);

  if (error) return res.status(httpStatusCode.BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = salesRequiredFields;
