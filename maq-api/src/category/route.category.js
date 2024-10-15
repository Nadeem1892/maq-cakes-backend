const router = require("express").Router()
const validate = require("../../middelWere/validationMiddleware")
const {categoryValidationSchema} = require("../validators/categoryValidation")
const categoryController = require("./controller.category")

router.post("/add-category",validate(categoryValidationSchema), categoryController.addCategory)
router.get("/get-categorys", categoryController.getAllCategory)
router.get("/get-category/:id", categoryController.getCategoryById)
router.patch("/update-category/:id", validate(categoryValidationSchema), categoryController.updateCategory)
router.delete("/delete-category/:id", categoryController.deleteCategory)

module.exports = router