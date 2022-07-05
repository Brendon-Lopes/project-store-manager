const express = require('express');

const productsRouter = express.Router();

const middleware = require('../middlewares');
const productsController = require('../controllers/productsControllers');

productsRouter.get('/search', productsController.searchByName);

productsRouter.get('/', productsController.getAll);

productsRouter.post(
  '/',
  middleware.productNameValidation,
  middleware.productNameLengthValidation,
  productsController.create,
);

productsRouter.get('/:id', productsController.getById);

productsRouter.put(
  '/:id',
  middleware.productNameValidation,
  middleware.productNameLengthValidation,
  productsController.updateById,
);

productsRouter.delete('/:id', productsController.deleteById);

module.exports = productsRouter;
