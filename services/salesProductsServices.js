const salesProductsModels = require('../models/salesProductsModels');
const productsModels = require('../models/productsModels');

const checkForProduct = async (sales) => {
  const result = sales.reduce((acc, { productId }) => {
    const product = productsModels.getById(productId);
    return [...acc, product];
  }, []);

  const products = await Promise.all(result);

  const isIdValid = products.some((product) => product.length === 0);

  return isIdValid;
};

const create = async (sales) => {
  const invalidId = await checkForProduct(sales);

  if (invalidId) return false;

  const result = await salesProductsModels.create(sales);

  return result;
};

module.exports = {
  create,
};
