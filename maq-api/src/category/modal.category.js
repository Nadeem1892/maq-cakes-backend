const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryName: {
    type:String,
    required:true
  },
  isDeleted: {
    type: Boolean,
    default: false, // Default value set to false
    required: false
  }
},{ timestamps: true });

const Category = mongoose.model("category", categorySchema);

module.exports = Category;