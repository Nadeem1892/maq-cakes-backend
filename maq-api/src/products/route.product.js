const router = require("express").Router()
const productController = require("./controller.product")

const validate = require("../../middelWere/validationMiddleware")
const { addProductSchema} = require("../validators/productValidation")


router.post("/add-product", validate(addProductSchema), productController.addProduct);
//get all product by category or sub category
router.get("/get-products-categoty-or-subcategory/:id", productController.getAllProductByCategoryOrSubCategory)
// get all products
router.get("/get-products", productController.getAll)

//get by id
router.get("/get-products/:id", productController.getProductById)

//update product
router.patch("/update-product/:id",validate(addProductSchema), productController.updateProduct)

//Delete Products 
router.delete("/delete-product/:id", productController.deleteProduct)

module.exports = router