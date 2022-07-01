const Joi = require('joi');

const validateRequired = Joi.object({
  productId: Joi.number().required()
    .messages({
      'any.required': '"productId" is required',
    }),
  quantity: Joi.number().required()
    .messages({
      'any.required': '"quantity" is required',
    }),
});

const validateQuantity = Joi.number().min(1).messages({
  'number.min': '"quantity" must be greater than or equal to 1',
});

module.exports = {
  validateRequired,
  validateQuantity,
};
