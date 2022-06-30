const productsService = require('../services/productsServices');
const httpStatusCode = require('../helpers/httpStatusCode');

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
      .json({ message: 'Internal server error' });
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
      .json({ message: 'Internal server error' });
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
      .json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
