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

//get subCategory by id  
serviceSubCategory.get = async (id) => {
  
  return await SubCategory.find({ categoryId: id, isDeleted: false })
};
// New method to get all subcategories with pagination
serviceSubCategory.getAll = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit; // Calculate how many records to skip
  const total = await SubCategory.countDocuments({ isDeleted: false }); // Get total count
  const subCategories = await SubCategory.find({ isDeleted: false })
    .skip(skip) // Skip the records
    .limit(limit); // Limit the number of records returned
  
  return { total, subCategories };
};

//update subCategory
serviceSubCategory.update = async (id, { subCategoryName }) => {
  return await SubCategory.findOneAndUpdate(
    { _id: id,isDeleted: false  },
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
