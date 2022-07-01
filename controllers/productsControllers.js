const productsService = require('../services/productsServices');
const httpStatusCode = require('../helpers/httpStatusCode');

const INTERNAL_SERVER_MESSAGE = 'Internal server error';

const getAll = async (req, res) => {
  try {
    const result = await productsService.getAll();

    if (!result) {
      return res
        .status(httpStatusCode.NOT_FOUND)
        .json({ message: 'Products not found' });
    }

    return res.status(httpStatusCode.OK).json(result);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: INTERNAL_SERVER_MESSAGE });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productsService.getById(id);

    if (!result) {
      return res
        .status(httpStatusCode.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    return res.status(httpStatusCode.OK).json(result);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: INTERNAL_SERVER_MESSAGE });
  }
};

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const product = await productsService.create(name);

    return res.status(httpStatusCode.CREATED).json(product);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: INTERNAL_SERVER_MESSAGE });
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await productsService.updateById(id, name);

    if (!result) {
      return res
        .status(httpStatusCode.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    return res.status(httpStatusCode.OK).json(result);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: INTERNAL_SERVER_MESSAGE });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await productsService.deleteById(id);

    if (!result) {
      return res
        .status(httpStatusCode.NOT_FOUND)
        .json({ message: 'Product not found' });
    }

    return res.status(httpStatusCode.NO_CONTENT).json(result);
  } catch (err) {
    return res
      .status(httpStatusCode.INTERNAL_SERVER)
      .json({ message: INTERNAL_SERVER_MESSAGE });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
