const router = require('express').Router()
const subCategoryController = require("./controller.subCategory")
const validate = require("../../middelWere/validationMiddleware")
const { subCategoryValidationSchema, updateSubCategoryValidationSchema } = require("../validators/subCategoryValidation")


router.post("/add-sub-category",validate(subCategoryValidationSchema), subCategoryController.addSubCategory)
router.get("/get-sub-categories/:id", subCategoryController.getSubCategory)
router.patch("/update-sub-category/:id",validate(updateSubCategoryValidationSchema), subCategoryController.updateSubCategory)

module.exports = router