const connection = require('../helpers/connection');

const getAll = async () => {
  const [result] = connection.execute(
    'SELECT * FROM StoreManager.products',
  );

  return result;
};

module.exports = {
  getAll,
};
