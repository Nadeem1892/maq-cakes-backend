const router = require("express").Router()
const categoryRoutes = require("../maq-api/src/category/route.category")
const subCategoryRoutes = require("../maq-api/src/sub-category/route.subCategory")

router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)


module.exports = router