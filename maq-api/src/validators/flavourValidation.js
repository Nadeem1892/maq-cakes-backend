const Joi = require("joi")

const flavourValidationSchema = Joi.object({
    flavourName: Joi.string().trim().min(3).max(30).required().messages({
        'string.base': 'Flavour name should be a text value.',
        'string.empty': 'Flavour name is required.',
        'string.min': 'Flavour name should have at least 3 characters.',
        'string.max': 'Flavour name should have a maximum of 30 characters.',
        'any.required': 'Flavour name is required.',
      }),
})


module.exports = { flavourValidationSchema }