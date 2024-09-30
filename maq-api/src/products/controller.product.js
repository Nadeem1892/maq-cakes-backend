const serviceProduct = require("./service.product");

const productController = {};

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
    const product = await serviceProduct.add(req.body);
    
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
};

// get all product by category
productController.getAllProductByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productByCategory = await serviceProduct.getAllByCategory(id);
    if (productByCategory.length === 0) {
      return res.status(400).json({
        status: false,
        message: `Products not Found.`,
      });
    }

    return res.send({
      status: true,
      message: "Products retrieved successfully.",
      data: productByCategory,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching Products. Please try again later.",
      error: error.message,
    });
  }
};

//get all product by sub Category
productController.getAllProductBySubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const productBySubCategory = await serviceProduct.getAllBySubCategory(id);
    if (productBySubCategory.length === 0) {
      return res.status(400).json({
        status: false,
        message: `Products not Found.`,
      });
    }

    return res.send({
      status: true,
      message: "Products retrieved successfully.",
      data: productBySubCategory,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching Products. Please try again later.",
      error: error.message,
    });
  }
};

// update 
productController.updateProduct = async (req, res) => {
    try {
        const {id} = req.params
        const updateData = req.body;

        const updatedProduct = await serviceProduct.update(id, updateData);

        if (!updatedProduct) {
            return res.status(404).json({
              status: false,
              message: "Product not found or already deleted.",
            });
          }
          return res.status(200).json({
            status: true,
            message: "Product updated successfully.",
            data: updatedProduct,
          });
    } catch (error) {
          return res.status(500).json({
      status: false,
      message: "Failed to update product.",
      error: error.message,
    });
    }
}



module.exports = productController;
