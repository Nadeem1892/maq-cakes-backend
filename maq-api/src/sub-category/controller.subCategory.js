const subCategoryService = require("./service.subCategory")
const subCategoryController = {}

subCategoryController.addSubCategory = async (req, res) => {
    try {
        const {subCategoryName, categoryId} = req.body
        
        const addSubCategory = await subCategoryService.add({subCategoryName, categoryId})
        return res.send({
            status: true,
            message: "SubCategory created successfully!",
            data: addSubCategory,
          });
    } catch (error) {
        return res.send({
            status: false,
            message:
              "Oops! Something went wrong while adding the category. Please try again.",
            error: error.message, // Optional, for debugging purposes
          });
    }
}


module.exports = subCategoryController