const connection = require('../helpers/connection');

const create = async () => {
  const [result] = connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (NULL)',
  );

  const { insertId } = result;

  return insertId;
};

module.exports = {
  create,
};
