const serviceSubCategory = require("./service.subCategory");

const subCategoryController = {};

// Add subCategory
subCategoryController.addSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    const existSubCategory = await serviceSubCategory.existingSubCategory(
      subCategoryName
    );

    if (existSubCategory) {
      return res.send({
        status: false,
        message: `Sub-Category '${subCategoryName}' already exists.`,
      });
    }
    const addSubCategory = await serviceSubCategory.add({
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
      message: "Oops! Something went wrong while adding the category. Please try again.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};

//get subCategoes
subCategoryController.getSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query; // Get pagination params from query

    if (id) {
      const getSubCategory = await serviceSubCategory.get(id);

      if (getSubCategory.length === 0) {
        return res.status(404).send({
          status: false,
          message: "Sub-category not found.",
        });
      }

      return res.send({
        status: true,
        message: "Sub-categories retrieved successfully.",
        data: getSubCategory,
      });
    } else {
      const { total, subCategories } = await serviceSubCategory.getAll(page, limit);
      return res.send({
        status: true,
        message: "All sub-categories retrieved successfully.",
        total, // Total number of subcategories
        data: subCategories,
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Oops! Something went wrong while fetching sub-categories. Please try again later.",
      error: error.message,
    });
  }
};

// //get Category by id
subCategoryController.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const getSubCategoryById = await serviceSubCategory.getSubCategoryById(id);
    return res.send({
      status: true,
      message: "Sub Category retrieved successfully.",
      data: getSubCategoryById,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching the Sub category. Please try again later.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};

//update subCategory
subCategoryController.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { subCategoryName } = req.body;

    const updateSubCategory = await serviceSubCategory.update(id, {subCategoryName});

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
      return res.send({
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
