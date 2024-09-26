const SubCategory = require("./model.subCategory");
const serviceSubCategory = {};

//Add Sub Category service
serviceSubCategory.add = async ({ subCategoryName, categoryId }) => {
  return await SubCategory.create({ subCategoryName, categoryId });
};

//get subCategory
serviceSubCategory.get = async (categoryId) => {
  return await SubCategory.find({categoryId, isDeleted: { $ne: true } });
};

//update subCategory
serviceSubCategory.update = async (id, { subCategoryName }) => {
  return await SubCategory.findByIdAndUpdate(
    { _id: id },
    { subCategoryName },
    { new: true }
  );
};


//get Sub Category by id 
serviceSubCategory.getSubCategoryById = async (id) => {
  // Fetch the user by ID from the database
  return await SubCategory.findById(id);
},


//Delete Category
serviceSubCategory.delete = async (id,updateFields) => {
  
  return await SubCategory.findByIdAndUpdate(id,{...updateFields},{new:true})
  }

module.exports = serviceSubCategory;
