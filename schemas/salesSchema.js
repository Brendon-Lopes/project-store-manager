const Joi = require('joi');

const validateQuantity = Joi.array().required().items(
  Joi.object({
    productId: Joi.number(),
    quantity: Joi.number().required().min(1).messages({
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
  }),
);

const validateProducts = Joi.array().required().items(
  Joi.object({
    productId: Joi.number().required().messages({
      'any.required': '"productId" is required',
    }),
    quantity: Joi.number().required().messages({
      'any.required': '"quantity" is required',
    }),
  }),
);

module.exports = {
  validateQuantity,
  validateProducts,
};
