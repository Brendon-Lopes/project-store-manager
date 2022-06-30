const salesProductsServices = require('../services/salesProductsServices');
const httpStatusCode = require('../helpers/httpStatusCode');

const create = async (req, res) => {
  try {
    const sales = req.body;

    const result = await salesProductsServices.create(sales);

    return res.status(httpStatusCode.CREATED).json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
};
