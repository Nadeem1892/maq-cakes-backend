const Product = require("./model.product");

const productService = {};

// Check if the flavour already exists (and is not marked as deleted)
productService.existingProduct = async (name) => {
  return await Product.findOne({
    name: { $regex: new RegExp("^" + name + "$", "i") },
    isDeleted: false,
  });
};

//add product
productService.add = async (productData) => {
  return await Product.create(productData);
};

// product by id
productService.getById = async (id) => {
  return await Product.findOne({ _id: id, isDeleted: false }); // Use `_id` to search
};
//get All By Category
productService.getAllByCategory = async (id) => {
    return await Product.find({category:id, isDeleted:false})
}

//get All By Sub-Category
productService.getAllBySubCategory = async (id) => {
    return await Product.find({subCategory:id, isDeleted:false})
}

//  productService.js
productService.getAll = async (page, limit) => {
  const skip = (page - 1) * limit; // Calculate the number of documents to skip
  return await Product.find({ isDeleted: false })
                      .skip(skip)
                      .limit(limit);
};

// Add a function to count all products
productService.countAll = async () => {
  return await Product.countDocuments({ isDeleted: false });
};

//Update
productService.update = async (id, updateData) => {
    return await Product.findOneAndUpdate(
      { _id: id, isDeleted: false },  // Ensure the product exists and is not deleted
      { $set: updateData },           // Update the fields based on the updateData object
      { new: true }                   // Return the updated product
    );
  };


  //delete
  productService.delete = async (id) => {
    return await Product.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
  };



module.exports = productService;
