const Product = require ("../../model/product/product.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");
const mailHeader = require("../common/mail-header");
const mailFooter = require("../common/mail-footer");

// express app imports
const selReport = require("./seller-reports");
const selStat = require("./seller-stat");
const selProduct = require("./seller-product");
const selOrder = require("./seller-order");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");

//express app declaration
const seller = express();

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
seller.use(bodyParser.json());
seller.use(bodyParser.urlencoded({ extended: false }));

// express app use
seller.use('/reports', selReport);
seller.use('/order', selOrder);
seller.use('/stat', selStat);
seller.use('/product', selProduct);

// REST API

// add seller photos
seller.post('/img/add',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let imagePaths = [];
    for (let f of req.files){
      imagePaths.push(url+ "/images/merchant/" + f.filename);
    }
    res.status(200).json({
      imagePaths: imagePaths
    });

});


//get service provider names list for report queries
seller.get('/selnames/get', checkAuth, (req, res, next) => {

  var query = Product.find({ user_id: req.userData.user_id }).select('product product_id');

  query.exec().then((resBooks) => {
    console.log(resBooks);
    res.status(200).json(
      {
        message: 'Report Data recieved successfully!',
        selnames: resBooks
      });
  }).catch(err => {
    console.log(err);
  })
});


//get service provider names list for report queries
seller.get('/selid/get', checkAuth, (req, res, next) => {
    res.status(200).json(
      {
        id: req.userData.user_id
      });
  });


// send an email
seller.post("/mail", checkAuth, (req,res,next) => {
  let mail = req.body;
  mail.email = req.userData.email;
  mail.html = mailHeader.mailHeader + mail.html + mailFooter.mailFooter;
  console.log(mail);
  email.sendMail(mail, info => {
    res.status(200).json(
      {
        message: 'mail sent successfully!',
        info: info
      }
    );
  }).catch(err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'mail sending failed!',
      }
    );
  })
});

module.exports = seller;
