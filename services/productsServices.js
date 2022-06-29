const productsModel = require('../models/productsModels');

const getAll = async () => {
  const result = await productsModel.getAll();

  if (!result || result.length === 0) return false;

  return result;
};

module.exports = {
  getAll,
};
