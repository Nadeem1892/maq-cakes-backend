const router = require('express').Router()
const subCategoryController = require("./controller.subCategory")
const validate = require("../../middelWere/validationMiddleware")
const { subCategoryValidationSchema } = require("../validators/subCategoryValidation")
router.post("/add-sub-category",validate(subCategoryValidationSchema), subCategoryController.addSubCategory)

module.exports = router