const connection = require('../helpers/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [id],
  );

  return result;
};

const create = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  const result = {
    id: product.insertId,
    name,
  };

  return result;
};

const updateById = async (id, name) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );

  return {
    id,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
};
