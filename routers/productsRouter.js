const express = require('express');

const productsRouter = express.Router();

productsRouter.get('/');

module.exports = productsRouter;
