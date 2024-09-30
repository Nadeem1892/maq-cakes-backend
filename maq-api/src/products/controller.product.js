const serviceProduct = require('./service.product')

const productController = {}

//Add Product
productController.addProduct = async (req, res) => {
try {
  
    const existingProduct = await serviceProduct.existingProduct(req.body.name);
    if (existingProduct) {
        return res.status(400).json({
          status: false,
          message: `Product '${req.body.name}' already exists.`,
        });
      }
    const product = await serviceProduct.add(req.body)
    console.log(product)
      return res.status(201).json({
        status: true,
        message: `Product added successfully.`,
        data: product,
      });
} catch (error) {
    return res.status(500).json({
        status: false,
        message: "Failed to add flavour.",
        error: error.message, // Send the error message for debugging
      });
}
}


module.exports = productController