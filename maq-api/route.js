const router = require("express").Router()
const categoryRoutes = require("../maq-api/src/category/route.category")
const subCategoryRoutes = require("../maq-api/src/sub-category/route.subCategory")
const flavourRoutes = require("../maq-api/src/Flavour/route.flavour")
const productRoutes = require("../maq-api/src/products/route.product")
const adminRoutes = require("../maq-api/src/Admin/route.admin")


router.use("/category", categoryRoutes)
router.use("/sub-category", subCategoryRoutes)
router.use("/flavour", flavourRoutes)
router.use("/product", productRoutes)
router.use("/admin", adminRoutes)



module.exports = router