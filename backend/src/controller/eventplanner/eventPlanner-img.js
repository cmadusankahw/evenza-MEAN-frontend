//model imports
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const uploadImage = require('../../../helpers/helpers');

//express app declaration
const eventPlannerImg = express();


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
    cb(error,"src/assets/images/planner");
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
eventPlannerImg.use(bodyParser.json());
eventPlannerImg.use(bodyParser.urlencoded({ extended: false }));

// REST API

// add eventPlanner photos
eventPlannerImg.post('/add',checkAuth, multerMid.array("images[]"), async (req, res, next) => {
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

module.exports = eventPlannerImg;
