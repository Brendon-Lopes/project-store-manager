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
    console.log(err);
  }
};

module.exports = {
  create,
};
