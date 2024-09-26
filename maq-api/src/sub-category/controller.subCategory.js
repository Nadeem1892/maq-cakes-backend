const serviceSubCategory = require("./service.subCategory");
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

    // // Check if getSubCategory is an empty array
    if (!getSubCategory || getSubCategory.length === 0) {
        return res.send({
          status: false,
          message: "Category not found.",
          data: null,
        });
      }
  
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

//Delete subCategory
subCategoryController.daleteSubCategory = async (req, res) => {
    try {
        const { id } = req.params
       
        const existingSubCategory = await serviceSubCategory.getSubCategoryById(id);
       
        if (!existingSubCategory) {
          return res.status(404).json({
            status: false,
            message: "Category not found.",
            data: null,
          });
        }
    
        // Check if the category is already deleted
        if (existingSubCategory.isDeleted) {
          return res.status(400).json({
            status: false,
            message: "This sub-category has already been deleted.",
            data: existingSubCategory._id,
          });
        }
    
        // Soft delete the category (set isDeleted to true)
        const deleteCategory = await serviceSubCategory.delete(id, {
          isDeleted: true,
        });

    
        // Verify if the deletion was successful
        if (deleteCategory && deleteCategory.isDeleted) {
          return res.status(200).json({
            status: true,
            message: "Sub-category deleted successfully.",
            data: deleteCategory._id,
          });
        } else {
          return res.status(500).json({
            status: false,
            message: "Failed to delete the sub-category.",
            data: null,
          });
        }
    } catch (error) {
        return res.status(500).json({
            status: "ERR",
            message: "Something went wrong. Please try again later.",
            data: null,
          });
    }
}

module.exports = subCategoryController;
