//model imports
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");

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


//middleware
eventImg.use(bodyParser.json());
eventImg.use(bodyParser.urlencoded({ extended: false }));


// REST API

// add a single photo
eventImg.post('/add',checkAuth, multer({storage:storage}).array("images[]"), (req, res) => {
  const url = req.protocol + '://' + req.get("host");
  const imagePath = (url+ "/images/events/" + req.files[0].filename);
  console.log(imagePath);
  res.status(200).json({
    imagePath: imagePath
  });
});

// add multiple photos
eventImg.post('/mul',checkAuth, multer({storage:storage}).array("images[]"), (req, res) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePaths = [];
  for (let f of req.files){
    imagePaths.push(url+ "/images/events/" + f.filename);
  }
  res.status(200).json({
    imagePaths: imagePaths
  });
});


module.exports = eventImg;
