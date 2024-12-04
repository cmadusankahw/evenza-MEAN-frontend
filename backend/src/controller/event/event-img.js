//model imports
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const uploadImage = require('../../../helpers/helpers');

//express app declaration
const eventImg = express();


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
    cb(error,"src/assets/images/events");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

// google cloud storage image uploads
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

//middleware
eventImg.use(bodyParser.json());
eventImg.use(bodyParser.urlencoded({ extended: false }));


// REST API

// add a single photo
eventImg.post('/add',checkAuth, multerMid.array("images[]"), async (req, res, next) => {
  try {
    let imagePath;
    imagePath = await uploadImage(req.files[0]);
    console.log('uploaded to google cloud', imagePath);
    res
      .status(200)
      .json({
        imagePath: imagePath
      });
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .json({
      message: "Upload was unsuccessful",
    });
  }
});

// add multiple photos
eventImg.post('/mul',checkAuth, multerMid.array("images[]"), async (req, res, next) => {
  try {
    let imagePaths = [];
    for (let f of req.files) {
      imagePaths.push(await uploadImage(f));
    }
    console.log('uploaded to google cloud', imagePaths);
    res
      .status(200)
      .json({
        imagePaths: imagePaths
      });
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .json({
      message: "Upload was unsuccessful",
    });
  }
});


module.exports = eventImg;
