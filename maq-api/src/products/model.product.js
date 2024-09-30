const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: true,
  },
  flavor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flavor",
    required: true,
  },
  weight: {
    type: String, // Example: '1kg', '500g'
    required: true,
  },
  shape: {
    type: String, // Example: 'Round', 'Heart', 'Square'
    required: true,
  },

  image: {
    // Changed from images to image
    type: String,
    required: true, // Ensure that an image is provided
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },

  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },

  discount: {
    type: Number,
    default: 0, // Discount percentage
  },
  isDeleted: {
    type: Boolean,
    default: false, // Default value set to false
    required: false
  }
},{timestamps:true});

module.exports = mongoose.model("Product", productSchema);
