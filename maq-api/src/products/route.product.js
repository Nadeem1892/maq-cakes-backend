const router = require("express").Router()
const productController = require("./controller.product")

router.post("/add-product", productController.addProduct)


module.exports = router