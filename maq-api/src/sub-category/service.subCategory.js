const SubCategory = require("./model.subCategory")
const serviceSubCategory = {}

//Add Sub Category service
serviceSubCategory.add = async ({subCategoryName,categoryId}) => {
return await SubCategory.create({subCategoryName,categoryId})
}

module.exports = serviceSubCategory