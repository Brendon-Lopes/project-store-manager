const connection = require('../helpers/connection');

const create = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (NULL)',
  );

  const { insertId } = result;

  return insertId;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.sales WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  create,
  findById,
};
