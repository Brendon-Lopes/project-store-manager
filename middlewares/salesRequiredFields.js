const httpStatusCode = require('../helpers/httpStatusCode');
const { validateRequired } = require('../schemas/salesSchema');

const salesRequiredFields = (req, res, next) => {
  const sales = req.body;
  let message = '';

  const invalid = sales.some((sale) => {
    const { error } = validateRequired.validate(sale);
    if (error) {
      message = error.message;
      return true;
    }
    return false;
  });

  if (invalid) return res.status(httpStatusCode.BAD_REQUEST).json({ message });

  next();
};

module.exports = salesRequiredFields;
