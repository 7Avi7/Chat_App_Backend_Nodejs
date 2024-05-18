const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Destination folder for file uploads (publicly accessible)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop(); // Get the file extension
    cb(
      null,
      file.originalname.replace(`.${extension}`, "") +
        "-" +
        uniqueSuffix +
        `.${extension}`
    ); // Append timestamp to original filename
  },
});


const upload = multer({
  storage: storage,
  
});

module.exports = upload;
