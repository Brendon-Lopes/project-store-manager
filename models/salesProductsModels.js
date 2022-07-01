const connection = require('../helpers/connection');

const salesModels = require('./salesModels');

const create = async (sales) => {
  const saleId = await salesModels.create();

  const values = sales.map(({ productId, quantity }) => ([saleId, productId, quantity]));

  const query = 'INSERT INTO StoreManager.sales_products(sale_id, product_id, quantity) VALUES ?;';

  await connection.query(query, [values]);

  const result = {
    id: saleId,
    itemsSold: sales,
  };

  return result;
};

const getAll = async () => {
  const query = `
    SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products sp
    ON s.id = sp.sale_id;
  `;

  const [sales] = await connection.execute(query);

  return sales;
};

const getById = async (id) => {
  const query = `
    SELECT s.date, sp.product_id, sp.quantity
    FROM StoreManager.sales s
    INNER JOIN StoreManager.sales_products sp
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?;
  `;

  const [sale] = await connection.execute(query, [id]);

  return sale;
};

module.exports = {
  create,
  getAll,
  getById,
};
