const express = require('express');

const salesProductsRouter = express.Router();

const middleware = require('../middlewares');
const salesProductsController = require('../controllers/salesProductsControllers');

salesProductsRouter.post(
  '/',
  middleware.salesRequiredFields,
  middleware.salesMinQuantityValidation,
  salesProductsController.create,
);

salesProductsRouter.get('/', salesProductsController.getAll);

salesProductsRouter.get('/:id', salesProductsController.getById);

salesProductsRouter.delete('/:id', salesProductsController.deleteById);

salesProductsRouter.put(
  '/:id',
  middleware.salesRequiredFields,
  middleware.salesMinQuantityValidation,
  salesProductsController.updateById,
);

module.exports = salesProductsRouter;
