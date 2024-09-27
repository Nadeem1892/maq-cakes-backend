const mongoose = require("mongoose")

const flavourSchema = mongoose.Schema({
flavourName:{
    type:String,
    required:true
},

isDeleted: {
    type: Boolean,
    default: false, // Default value set to false
    required: false
  }
},{timestamps:true})

const Flavour = mongoose.model("flavour", flavourSchema)

module.exports = Flavour