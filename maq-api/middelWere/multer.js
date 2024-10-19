const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // File name
  }
});

// Create the multer instance
const upload = multer({ storage });

module.exports = upload;
