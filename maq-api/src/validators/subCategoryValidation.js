const Joi = require("joi")

const subCategoryValidationSchema = Joi.object({
     
    subCategoryName: Joi.string().trim().min(3).max(30).required().messages({
        'string.base': 'Subcategory name should be a text value.',
        'string.empty': 'Subcategory name is required.',
        'string.min': 'Subcategory name should have at least 3 characters.',
        'string.max': 'Subcategory name should have a maximum of 30 characters.',
        'any.required': 'Subcategory name is required.',
      }),
      
      categoryId: Joi.string().trim().required().pattern(/^[0-9a-fA-F]{24}$/).messages({
        'string.empty': 'Category ID is required.',
        'string.pattern.base': 'Please provide a valid Category ID.',
        'any.required': 'Category ID is required.',
      })
})


// Schema for updating a subcategory (categoryId is optional)
const updateSubCategoryValidationSchema = Joi.object({
  subCategoryName: Joi.string().trim().min(3).max(30).required().messages({
    'string.base': 'Subcategory name should be a text value.',
    'string.empty': 'Subcategory name is required.',
    'string.min': 'Subcategory name should have at least 3 characters.',
    'string.max': 'Subcategory name should have a maximum of 30 characters.',
    'any.required': 'Subcategory name is required.',
  }),
  categoryId: Joi.string().trim().optional().pattern(/^[0-9a-fA-F]{24}$/).messages({
    'string.pattern.base': 'Please provide a valid Category ID.',
  })
});

module.exports = {
    subCategoryValidationSchema,updateSubCategoryValidationSchema
  };