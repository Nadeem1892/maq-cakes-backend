const Category = require("./modal.category")

const serviceCategory = {}

// add service Category
serviceCategory.add = async ({categoryName}) => {
return await Category.create({categoryName})
}

// Get all  Category Service
serviceCategory.getAllCategory = async () => {
    return await Category.find({ isDeleted: { $ne: true } })
}

//get Category by id 
serviceCategory.getCategoryById = async (id) => {
    // Fetch the user by ID from the database
    return await Category.findById(id);
  },

//update Category
serviceCategory.update = async (id,{categoryName}) => {
    return await Category.findByIdAndUpdate({_id:id},{categoryName},{ new: true })
}

//Delete Category
serviceCategory.deleteCategory = async (id,updateFields) => {
return await Category.findByIdAndUpdate(id,{...updateFields},{new:true})
}

module.exports = serviceCategory