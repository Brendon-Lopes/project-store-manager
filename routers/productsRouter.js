const express = require('express');

const productsRouter = express.Router();

const controller = require('../controllers/productsControllers');

productsRouter.get('/', controller.getAll);

module.exports = productsRouter;
