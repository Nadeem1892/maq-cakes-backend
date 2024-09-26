const SubCategory = require("./model.subCategory");
const serviceSubCategory = {};

//Add Sub Category service
serviceSubCategory.add = async ({ subCategoryName, categoryId }) => {
  return await SubCategory.create({ subCategoryName, categoryId });
};

//get subCategory
serviceSubCategory.get = async (categoryId) => {
  return await SubCategory.find({categoryId});
};

//update subCategory
serviceSubCategory.update = async (id, { subCategoryName }) => {
  return await SubCategory.findByIdAndUpdate(
    { _id: id },
    { subCategoryName },
    { new: true }
  );
};
module.exports = serviceSubCategory;
