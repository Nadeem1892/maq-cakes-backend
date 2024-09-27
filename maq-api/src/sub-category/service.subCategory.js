const SubCategory = require("./model.subCategory");
const serviceSubCategory = {};

// Check if the flavour already exists (and is not marked as deleted)
serviceSubCategory.existingSubCategory = async (subCategoryName) => {
  return await SubCategory.findOne({
    subCategoryName: { $regex: new RegExp("^" + subCategoryName + "$", "i") },
    isDeleted: false,
  });
};

//Add Sub Category service
serviceSubCategory.add = async ({ subCategoryName, categoryId }) => {
  return await SubCategory.create({ subCategoryName, categoryId });
};

//get subCategory
serviceSubCategory.get = async () => {
  return await SubCategory.find({ isDeleted: false });
};

//update subCategory
serviceSubCategory.update = async (id, { subCategoryName }) => {
  return await SubCategory.findByIdAndUpdate(
    { _id: id },
    { subCategoryName },
    { new: true }
  );
};



  //Delete Category
  serviceSubCategory.delete = async (id) => {
    return await SubCategory.findOneAndUpdate(
      { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
  };

module.exports = serviceSubCategory;
