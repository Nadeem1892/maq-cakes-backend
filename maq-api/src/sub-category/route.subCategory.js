const router = require('express').Router();
const subCategoryController = require("./controller.subCategory");
const validate = require("../../middelWere/validationMiddleware");
const { subCategoryValidationSchema, updateSubCategoryValidationSchema } = require("../validators/subCategoryValidation");

// Route to add a sub-category
router.post("/add-sub-category", validate(subCategoryValidationSchema), subCategoryController.addSubCategory);

// Route to get sub-categories with optional category ID
router.get("/get-sub-categories/:id?", subCategoryController.getSubCategory);

// Route to update a sub-category
router.patch("/update-sub-category/:id", validate(updateSubCategoryValidationSchema), subCategoryController.updateSubCategory);

// Route to delete a sub-category
router.delete("/delete-sub-category/:id", subCategoryController.daleteSubCategory);

module.exports = router;
