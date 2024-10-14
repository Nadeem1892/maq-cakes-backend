const router = require("express").Router()
const productController = require("./controller.product")
const validate = require("../../middelWere/validationMiddleware")
const { addProductSchema, updateProductSchema } = require("../validators/productValidation")
router.post("/add-product",validate(addProductSchema), productController.addProduct)
//get all product by category like cakes
router.get("/get-products-category/:id", productController.getAllProductByCategory)
//get all product by sub category like cakes
router.get("/get-products-sub-category/:id", productController.getAllProductBySubCategory)
// get all products
router.get("/get-products", productController.getAll)

//update product
router.patch("/update-product/:id",validate(addProductSchema), productController.updateProduct)

//Delete Products 
router.delete("/delete-product/:id", productController.deleteProduct)

module.exports = router