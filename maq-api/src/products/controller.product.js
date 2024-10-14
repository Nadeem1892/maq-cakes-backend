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

//get all products 
// productController.js
productController.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

  try {
    const getAllProducts = await serviceProduct.getAll(page, limit);
    
    // Get total count for pagination
    const totalProducts = await serviceProduct.countAll();

    return res.status(200).json({
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products: getAllProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// update product
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


// Delete
productController.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
    
        const deletedProduct = await serviceProduct.delete(id);
        
        //check exist ot not
        if (!deletedProduct) {
          return res.status(404).json({
            status: false,
            message: "Product not found or already deleted.",
          });
        }
    
        return res.status(200).json({
            status: true,
            message: "Product deleted successfully."
          });
      } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({
          status: false,
          message: "An error occurred while deleting the Product."
        });
      }
}



module.exports = productController;
