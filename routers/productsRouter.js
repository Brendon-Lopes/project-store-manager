const express = require('express');

const productsRouter = express.Router();

const controller = require('../controllers/productsControllers');

productsRouter.get('/', controller.getAll);
productsRouter.get('/:id', controller.getById);

module.exports = productsRouter;
