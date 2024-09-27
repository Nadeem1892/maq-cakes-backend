const Flavour = require("./model.flavour")

const serviceFlavour = {}

//Add
serviceFlavour.add = async ({flavourName}) => {
return await Flavour.create({flavourName})
}

//get
serviceFlavour.get = async () => {
return await Flavour.find({isDeleted:false})    
}




module.exports = serviceFlavour