// imports
const Service = require("../../model/service/service.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

// express app imports
const spReport = require("./sp-report");
const spAppoint = require("./serviceProvider-appoint");
const spBooking = require("./serviceProvider-booking");
const spStat = require("./serviceProvider-stat");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

//express app declaration
const serviceProvider = express();

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
    cb(error, "images/merchant");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

//middleware
serviceProvider.use(bodyParser.json());
serviceProvider.use(bodyParser.urlencoded({ extended: false }));

// express app includes
serviceProvider.use('/reports', spReport);
serviceProvider.use('/booking', spBooking);
serviceProvider.use('/appoint', spAppoint);
serviceProvider.use('/stat', spStat);

// REST API

// add serviceProvider photos
serviceProvider.post('/add/img', checkAuth, multer({ storage: storage }).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePaths = [];
  for (let f of req.files) {
    imagePaths.push(url + "/images/merchant/" + f.filename);
  }
  res.status(200).json({
    imagePaths: imagePaths
  });

});

//get service provider names list for report queries
serviceProvider.get('/spnames/get', checkAuth, (req, res, next) => {

  var query = Service.find({ user_id: req.userData.user_id }).select('service_name service_id');

  query.exec().then((resBooks) => {
    console.log(resBooks);
    res.status(200).json(
      {
        message: 'Report Data recieved successfully!',
        spnames: resBooks
      });
  }).catch(err => {
    console.log(err);
  })
});


//get service provider names list for report queries
serviceProvider.get('/spid/get', checkAuth, (req, res, next) => {
    res.status(200).json(
      {
        id: req.userData.user_id
      });
  });


// send an  email
serviceProvider.post("/mail", checkAuth, (req, res, next) => {
  let mail = req.body;
  mail.email = req.userData.email;
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

module.exports = serviceProvider;
