const Joi = require('joi');

const nameValidation = Joi
  .string()
  .required()
  .messages({
    'any.required': '"name" is required',
  });

const nameLengthValidation = Joi
  .string()
  .min(5)
  .messages({
    'string.min': '"name" length must be at least 5 characters long',
  });

module.exports = {
  nameValidation,
  nameLengthValidation,
};
