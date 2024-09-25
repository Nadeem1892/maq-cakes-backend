const router = require("express").Router()
const categoryRoutes = require("../maq-api/src/category/route.category")
router.use("/category", categoryRoutes)


module.exports = router