const express = require('express');

const productsRouter = express.Router();

const middleware = require('../middlewares');
const productsController = require('../controllers/productsControllers');

productsRouter.get('/', productsController.getAll);

productsRouter.post(
  '/',
  middleware.productNameValidation,
  middleware.productNameLengthValidation,
  productsController.create,
);

productsRouter.get('/:id', productsController.getById);

module.exports = productsRouter;
