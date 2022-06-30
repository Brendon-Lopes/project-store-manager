const express = require('express');

const salesProductsRouter = express.Router();

const salesProductsController = require('../controllers/salesProductsControllers');

salesProductsRouter.post('/', salesProductsController.create);

module.exports = salesProductsRouter;
