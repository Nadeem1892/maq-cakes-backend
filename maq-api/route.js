const router = require("express").Router()
const categoryRoutes = require("../maq-api/src/category/route.category")
const subCategoryRoutes = require("../maq-api/src/sub-category/route.subCategory")
const flavourRoutes = require("../maq-api/src/Flavour/route.flavour")
router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)
router.use("/flavour",flavourRoutes)


module.exports = router