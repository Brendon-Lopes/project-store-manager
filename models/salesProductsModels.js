const connection = require('../helpers/connection');

const salesModels = require('./salesModels');

const create = async (sales) => {
  const saleId = await salesModels.create();

  const values = sales.map(({ productId, quantity }) => ([saleId, productId, quantity]));

  const query = 'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES ?';

  await connection.query(query, [values]);

  const result = {
    id: saleId,
    itemsSold: sales,
  };

  return result;
};

module.exports = {
  create,
};
