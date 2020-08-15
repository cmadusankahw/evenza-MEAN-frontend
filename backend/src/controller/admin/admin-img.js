//model imports
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

//express app declaration
const adminImg = express();

// multer setup for image upload
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Image");
    if (isValid) {
      error = null;
    }
    cb(error, "src/assets/images/admin");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//middleware
adminImg.use(bodyParser.json());
adminImg.use(bodyParser.urlencoded({ extended: false }));

// add admin photos
adminImg.post('/add', checkAuth, multer({ storage: storage }).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let image01Path, image02Path, image03Path = null;
  let imagePaths = [];
  for (let f of req.files) {
    imagePaths.push(url + "/images/admin/" + f.filename);
  }
  res.status(200).json({ imagePaths: imagePaths });

});

module.exports = adminImg;
