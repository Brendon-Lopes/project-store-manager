const express = require('express');

const productsRouter = express.Router();

const middleware = require('../middlewares');
const controller = require('../controllers/productsControllers');

productsRouter.get('/', controller.getAll);

productsRouter.post(
  '/',
  middleware.productNameValidation,
  middleware.productNameLengthValidation,
  controller.create,
);

productsRouter.get('/:id', controller.getById);

module.exports = productsRouter;
