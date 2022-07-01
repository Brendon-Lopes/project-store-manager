const salesProductsServices = require('../services/salesProductsServices');
const httpStatusCode = require('../helpers/httpStatusCode');

const create = async (req, res) => {
  try {
    const sales = req.body;

    const result = await salesProductsServices.create(sales);

    if (!result) {
      return res.status(httpStatusCode.NOT_FOUND).json({ message: 'Product not found' });
    }

    return res.status(httpStatusCode.CREATED).json(result);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const sales = await salesProductsServices.getAll();

    return res.status(httpStatusCode.OK).json(sales);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: 'Internal server error' });
  }
};

module.exports = {
  create,
  getAll,
};
