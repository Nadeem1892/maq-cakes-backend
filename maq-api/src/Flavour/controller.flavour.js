const serviceFlavour = require("./service.flavour");

const controllerFlavour = {};

//add Flavour
controllerFlavour.addFlavour = async (req, res) => {
  try {
    const { flavourName } = req.body;

    const flavourAdd = await serviceFlavour.add({ flavourName });
    return res.status(201).json({
      status: true,
      message: "Flavour added successfully.",
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
        const getFlavours = await serviceFlavour.get()
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

//update flavour
controllerFlavour.updateFlavour = async (req, res) => {

};

//dlete flavoure
controllerFlavour.deleteFlavour = async (req, res) => {};

module.exports = controllerFlavour;
