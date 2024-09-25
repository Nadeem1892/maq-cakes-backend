const mongoose = require("mongoose")


const subCategorySchema = new mongoose.Schema({
    categoryId:{
        type:String,
        required:true
    },
    subCategoryName:{
        type:String,
        required:true
    }
},{ timestamps: true })

const SubCategory = mongoose.model("subCategory",subCategorySchema)
module.exports = SubCategory