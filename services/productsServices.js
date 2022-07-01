const productsModel = require('../models/productsModels');

const getAll = async () => {
  const result = await productsModel.getAll();

  if (!result || result.length === 0) return false;

  return result;
};

const getById = async (id) => {
  const [result] = await productsModel.getById(id);

  if (!result || result.length === 0) return false;

  return result;
};

const create = async (name) => {
  const result = await productsModel.create(name);

  return result;
};

const updateById = async (id, name) => {
  const findProduct = await getById(id);

  if (!findProduct) return false;

  const result = await productsModel.updateById(id, name);

  return result;
};

const deleteById = async (id) => {
  const findProduct = await getById(id);

  if (!findProduct) return false;

  await productsModel.deleteById(id);

  return true;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
