const Joi = require("joi");

// Joi schema for adding a product
const addProductSchema = Joi.object({
  name: Joi.string().min(3).trim().required().messages({
    'string.base': 'Product name should be a text value.',
    'string.empty': 'Product name is required.',
    'string.min': 'Product name should have at least 3 characters.',
    'any.required': 'Product name is required.',
  }),
  price: Joi.number().min(3).required().messages({
    'number.base': 'Price must be a valid number.',
    'number.min': 'Price must be at least 3.',
    'any.required': 'Price is required.',
  }),
  description: Joi.string().min(3).max(200).trim().optional().messages({
    'string.min': 'Description must be at least 3 characters long.',
    'string.max': 'Description should have a maximum of 200 characters.',
  }),
  category: Joi.string().trim().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.empty': 'Category ID is required.',
    'string.pattern.base': 'Please provide a valid Category ID.',
    'any.required': 'Category ID is required.',
  }),
  subCategory: Joi.string().trim().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.empty': 'Sub-category ID is required.',
    'string.pattern.base': 'Please provide a valid Sub-category ID.',
    'any.required': 'Sub-category ID is required.',
  }),
  flavor: Joi.string().trim().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.empty': 'Flavor ID is required.',
    'string.pattern.base': 'Please provide a valid Flavor ID.',
    'any.required': 'Flavor ID is required.',
  }),
  weight: Joi.string().trim().required().messages({
    'string.empty': 'Weight is required.',
  }),
  shape: Joi.string().trim().required().messages({
    'string.empty': 'Shape is required.',
  }),
  image: Joi.string().trim().optional().messages({
    'string.empty': 'Image URL is required.',
  }),
  isAvailable: Joi.boolean().optional(),
  status: Joi.string().valid("Active", "Inactive").default("Active"),
  discount: Joi.number().min(0).max(100).default(0).messages({
    'number.min': 'Discount must be at least 0%.',
    'number.max': 'Discount cannot be more than 100%.',
  }),
  isDeleted: Joi.boolean().default(false),
});

module.exports = { addProductSchema };
