const router = require("express").Router()
const productController = require("./controller.product")

router.post("/add-product", productController.addProduct)
//get all product by category like cakes
router.get("/get-products-category/:id", productController.getAllProductByCategory)
//get all product by sub category like cakes
router.get("/get-products-sub-category/:id", productController.getAllProductBySubCategory)

module.exports = router