const salesProductsModels = require('../models/salesProductsModels');
const salesModels = require('../models/salesModels');
const productsModels = require('../models/productsModels');

const checkForProduct = async (sales) => {
  const result = sales.reduce((acc, { productId }) => {
    const product = productsModels.getById(productId);
    return [...acc, product];
  }, []);

  const products = await Promise.all(result);

  const isIdInvalid = products.some((product) => product.length === 0);

  return isIdInvalid;
};

const create = async (sales) => {
  const isIdInvalid = await checkForProduct(sales);

  if (isIdInvalid) return false;

  const result = await salesProductsModels.create(sales);

  return result;
};

const getAll = async () => {
  const sales = await salesProductsModels.getAll();

  const result = sales.map(({ sale_id: saleId, date, product_id: productId, quantity }) => ({
    saleId,
    date,
    productId,
    quantity,
  }));

  return result;
};

const getById = async (id) => {
  const sale = await salesProductsModels.getById(id);

  if (sale.length === 0) return false;

  const result = sale.map(({ date, product_id: productId, quantity }) => ({
    date,
    productId,
    quantity,
  }));

  return result;
};

const deleteById = async (id) => {
  const sale = await salesModels.findById(id);

  if (sale.length === 0) return false;

  await salesProductsModels.deleteById(id);

  return true;
};

const updateById = async (saleId, sales) => {
  const sale = await salesModels.findById(saleId);

  if (sale.length === 0) return { error: true, message: 'Sale not found' };

  const invalidId = await checkForProduct(sales);

  if (invalidId) return { error: true, message: 'Product not found' };

  const update = sales.reduce((acc, { productId, quantity }) => {
    const updatedSale = salesProductsModels.updateById(saleId, productId, quantity);
    return [...acc, updatedSale];
  }, []);

  await Promise.all(update);

  const updatedItems = {
    saleId,
    itemsUpdated: sales,
  };

  return updatedItems;
};

module.exports = {
  checkForProduct,
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
