const serviceSubCategory = require("./service.subCategory");
const subCategoryService = require("./service.subCategory");
const subCategoryController = {};

// Add subCategory
subCategoryController.addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    const existSubCategory = await serviceSubCategory.existingSubCategory(
      subCategoryName
    );

    if (existSubCategory) {
      return res.status(400).json({
        status: false,
        message: `Sub-Category '${subCategoryName}' already exists.`,
      });
    }
    const addSubCategory = await subCategoryService.add({
      subCategoryName,
      categoryId,
    });
    return res.send({
      status: true,
      message: "Sub-Category created successfully!",
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
    const getSubCategory = await subCategoryService.get();

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

    const updateSubCategory = await subCategoryService.update(id, {subCategoryName});

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

//Delete subCategory
subCategoryController.daleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete the category (set isDeleted to true)
    const deleteSubCategory = await serviceSubCategory.delete(id);

    //check exist ot not
    if (!deleteSubCategory) {
      return res.status(404).json({
        status: false,
        message: "Sub-Category not found or already deleted.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Sub-category deleted successfully.",
      data: deleteSubCategory._id,
    });
  } catch (error) {
    return res.status(500).json({
      status: "ERR",
      message: "Something went wrong. Please try again later.",
      data: null,
    });
  }
};

module.exports = subCategoryController;
