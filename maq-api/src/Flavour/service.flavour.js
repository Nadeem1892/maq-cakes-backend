const Flavour = require("./model.flavour")

const serviceFlavour = {}

// Check if the flavour already exists (and is not marked as deleted)
serviceFlavour.existingFlavour = async (flavourName) =>{
    return await Flavour.findOne({ flavourName: { $regex: new RegExp("^" + flavourName + "$", "i") }, isDeleted: false })
}

//Add
serviceFlavour.add = async ({flavourName}) => {
return await Flavour.create({flavourName})
}

//get
serviceFlavour.get = async () => {
return await Flavour.find({isDeleted:false}).sort({ flavourName: 1 });    
}

//Update
serviceFlavour.update = async (id, { flavourName }) => {
    return await Flavour.findOneAndUpdate(
      { _id: id, isDeleted: false }, // Ensure the document is not deleted
      { flavourName: flavourName },   // Update the flavourName
      { new: true }                   // Return the updated document
    );
  };

//delete
serviceFlavour.delete = async (id) => {
    return await Flavour.findOneAndUpdate(
        { _id: id, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
  };





module.exports = serviceFlavour