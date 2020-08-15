//model imports
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");

//express app declaration
const authImg = express();


// multer setup for image upload
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
  'image/gif' : 'gif'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid Image");
    if(isValid){
      error=null;
    }
    cb(error,"src/assets/images/merchant");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//middleware
authImg.use(bodyParser.json());
authImg.use(bodyParser.urlencoded({ extended: false }));

//REST API

// add profile pic for user
authImg.post('/add',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  imagePath = url+ "/images/merchant/" +  req.files[0].filename;
  res.status(200).json({
    profile_pic: imagePath
  });
});

// add merchant business profile photos
authImg.post('/mul',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePaths = [];
  for (let f of req.files){
    imagePaths.push(url+ "/images/merchant/"+ f.filename);
  }
  res.status(200).json({imagePaths: imagePaths});
});

// add merchant photos a single image only
authImg.post('/single',checkAuth, multer({storage:storage}).single("images"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
    imagePath = url+ "/images/merchant/"  + f.filename;
  res.status(200).json({imagePath: imagePath});
});


module.exports = authImg;
