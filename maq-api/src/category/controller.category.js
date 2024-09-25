const serviceCategory = require("./service.category");
const categoryService = require("./service.category");

const categoryController = {};

//Add Category
categoryController.addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const addCategory = await categoryService.add({ categoryName });
    return res.send({
      status: true,
      message: "Category created successfully!",
      data: addCategory,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while adding the category. Please try again.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};

//Get all Category
categoryController.getAllCategory = async (req, res) => {
  try {
    const getAll = await categoryService.getAllCategory();
    return res.send({
      status: true,
      message: "Categories retrieved successfully.",
      data: getAll,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching categories. Please try again later.",
      error: error.message,
    });
  }
};

//get Category by id
categoryController.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const getCategoryById = await serviceCategory.getCategoryById(id);
    
    // Check if the category exists and is not deleted
    if (!getCategoryById || getCategoryById.isDeleted) {
        return res.send({
          status: false,
          message: "Category not found.",
          data: null,
        });
      }

    return res.send({
      status: true,
      message: "Category retrieved successfully.",
      data: getCategoryById,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching the category. Please try again later.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};

//Update Category
categoryController.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const updateCategory = await serviceCategory.update(id, { categoryName });

    if (!updateCategory) {
      return res.send({
        status: false,
        message: "Category not found.",
        data: null,
      });
    }

    return res.send({
      status: true,
      message: "Category updated successfully!",
      data: updateCategory,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while updating the category. Please try again.",
      data: null,
    });
  }
};

//Delete Category
categoryController.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the category exists
    const existingCategory = await serviceCategory.getCategoryById(id);
    if (!existingCategory) {
      return res.send({
        status: false,
        message: "Category not found.",
        data: null,
      });
    }

    // Check if the category is already deleted
    if (existingCategory.isDeleted) {
      return res.send({
        status: false,
        message: "This category has already been deleted.",
        data: existingCategory._id,
      });
    }

    // Delete the category (soft delete by setting isDeleted to true)
    const deleteCategory = await serviceCategory.deleteCategory(id, {
      $set: { isDeleted: true },
    });

    // Verify the deletion
    if (deleteCategory.isDeleted) {
      return res.send({
        status: true,
        message: "Category deleted successfully.",
        data: deleteCategory._id,
      });
    } else {
      return res.send({
        status: false,
        message: "Failed to delete the category.",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.send({
      status: "ERR",
      message: "Something went wrong. Please try again later.",
      data: null,
    });
  }
};

module.exports = categoryController;
