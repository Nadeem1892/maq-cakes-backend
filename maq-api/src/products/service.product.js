const Product = require('./model.product')

const productService = {}

// Check if the flavour already exists (and is not marked as deleted)
productService.existingProduct = async (name) =>{
    return await Product.findOne({ name: { $regex: new RegExp("^" + name + "$", "i") }, isDeleted: false })
}

//add product 
productService.add = async (productData) => {
    
return await Product.create(productData)
}


module.exports = productService;