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

module.exports = salesProductsRouter;
