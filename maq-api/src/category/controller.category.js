const serviceCategory = require("./service.category");
const categoryService = require("./service.category");

const categoryController = {};

//Add Category
categoryController.addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    const existingCategory = await serviceCategory.existingCategory(categoryName);

    if (existingCategory) {
      return res.send({
        status: false,
        message: `Category '${categoryName}' already exists.`,
      });
    }

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
    const getAll = await categoryService.get();
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

// //get Category by id
categoryController.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const getCategoryById = await serviceCategory.getCategoryById(id);
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
      return res.status(404).json({
        status: false,
        message: "Category not found. Check the ID or if it was deleted.",
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
  
  
      // Soft delete the category (set isDeleted to true)
      const deleteCategory = await serviceCategory.delete(id);
  //check exist ot not
  if (!deleteCategory) {
    return res.status(404).json({
      status: false,
      message: "Category not found or already deleted.",
    });
  }
      
        return res.status(200).json({
          status: true,
          message: "Category deleted successfully.",
          data: deleteCategory._id,
        });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "ERR",
        message: "Something went wrong. Please try again later.",
        data: null,
      });
    }
  };
  

module.exports = categoryController;
