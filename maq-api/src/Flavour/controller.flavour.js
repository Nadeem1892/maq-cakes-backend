const serviceFlavour = require("./service.flavour");

const controllerFlavour = {};

//add Flavour
controllerFlavour.addFlavour = async (req, res) => {
  try {
    const { flavourName } = req.body;

    const existingFlavour = await serviceFlavour.existingFlavour(flavourName);

    if (existingFlavour) {
      return res.status(400).json({
        status: false,
        message: `Flavour '${flavourName}' already exists.`,
      });
    }

    const flavourAdd = await serviceFlavour.add({ flavourName });
    return res.status(201).json({
      status: true,
      message: `'${flavourName}' added successfully.`,
      data: flavourAdd,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to add flavour.",
      error: error.message, // Send the error message for debugging
    });
  }
};

//get flavour
controllerFlavour.getFlavours = async (req, res) => {
  try {
    const getFlavours = await serviceFlavour.get();
    return res.status(201).json({
      status: true,
      message: "Flavours retrieved successfully.",
      data: getFlavours,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message:
        "Oops! Something went wrong while fetching categories. Please try again later.",
      error: error.message,
    });
  }
};


// //get Category by id
controllerFlavour.getFlavourById = async (req, res) => {
  try {
    const { id } = req.params;
    const getFlavourById = await serviceFlavour.getFlavourById(id);
    return res.send({
      status: true,
      message: "Flavour retrieved successfully.",
      data: getFlavourById,
    });
  } catch (error) {
    return res.send({
      status: false,
      message:
        "Oops! Something went wrong while fetching the category. Flavour try again later.",
      error: error.message, // Optional, for debugging purposes
    });
  }
};


//update flavour
controllerFlavour.updateFlavour = async (req, res) => {
  try {
    const { flavourName } = req.body;
    const { id } = req.params;

    const updatedFlavour = await serviceFlavour.update(id, { flavourName });

    if (!updatedFlavour) {
      return res.status(404).json({
        status: false,
        message: "Flavour not found. Check the ID or if it was deleted.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Flavour updated successfully.",
      data: updatedFlavour,
    });
  } catch (error) {
    console.error("Update Error:", error); // Log the error for debugging
    return res.status(500).json({
      status: false,
      message: "Error updating flavour.",
      error: error.message,
    });
  }
};

//delete flavoure
controllerFlavour.deleteFlavour = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFlavour = await serviceFlavour.delete(id);
    
    //check exist ot not
    if (!deletedFlavour) {
      return res.status(404).json({
        status: false,
        message: "Flavour not found or already deleted.",
      });
    }

    return res.status(200).json({
        status: true,
        message: "Flavour deleted successfully."
      });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while deleting the flavour."
    });
  }
};

module.exports = controllerFlavour;
