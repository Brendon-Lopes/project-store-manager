const productsModel = require('../models/productsModels');

const getAll = async () => {
  const result = await productsModel.getAll();

  if (!result) return false;

  return result;
};

module.exports = {
  getAll,
};
