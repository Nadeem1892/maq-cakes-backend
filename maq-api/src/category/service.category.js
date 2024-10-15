const Category = require("./modal.category")

const serviceCategory = {}

// Check if the flavour already exists (and is not marked as deleted)
serviceCategory.existingCategory = async (categoryName) =>{
  return await Category.findOne({ categoryName: { $regex: new RegExp("^" + categoryName + "$", "i") }, isDeleted: false })
}

// add service Category
serviceCategory.add = async ({categoryName}) => {
return await Category.create({categoryName})
}

// Get all  Category Service
serviceCategory.get = async () => {
    return await Category.find({ isDeleted: { $ne: true }}).sort({ categoryName: 1 })
}

// //get Category by id 
serviceCategory.getCategoryById = async (id) => {
    // Fetch the user by ID from the database
    return await Category.findById(id);
  },


  // //find by category is deleting
  // serviceCategory.findByDeleteCategory = async (id) => {
  //   return await Category.findById({ _id: id})
  // }

//update Category
serviceCategory.update = async (id,{categoryName}) => {
    return await Category.findOneAndUpdate({ _id: id, isDeleted: false},{categoryName},{ new: true })
}


//Delete Category
serviceCategory.delete= async (id) => {
return await Category.findOneAndUpdate({ _id: id, isDeleted: false},{ isDeleted: true },{new:true})
}

module.exports = serviceCategory