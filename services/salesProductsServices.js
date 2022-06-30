const salesProductsModels = require('../models/salesProductsModels');

const create = async (sales) => {
  const result = await salesProductsModels.create(sales);

  return result;
};

module.exports = {
  create,
};
