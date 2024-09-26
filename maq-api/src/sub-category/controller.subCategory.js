const subCategoryService = require("./service.subCategory");
const subCategoryController = {};

// Add subCategory
subCategoryController.addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    const addSubCategory = await subCategoryService.add({
      subCategoryName,
      categoryId,
    });
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
};

//get subCategory
subCategoryController.getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const getSubCategory = await subCategoryService.get(id);
  
    return res.send({
      status: true,
      message: "Sub-categories retrieved successfully.",
      data: getSubCategory,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching sub-categories. Please try again later.",
      error: error.message,
    });
  }
};

//update subCategory
subCategoryController.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName } = req.body;

    const updateSubCategory = await subCategoryService.update(id, {
      subCategoryName,
    });

    if (!updateSubCategory) {
      return res.send({
        status: false,
        message: "Sub-Category not found.",
        data: null,
      });
    }

    return res.send({
      status: true,
      message: "Sub-Category updated successfully!",
      data: updateSubCategory,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while updating the sub-category. Please try again.",
      data: null,
    });
  }
};

module.exports = subCategoryController;
