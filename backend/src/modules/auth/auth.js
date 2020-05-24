//model imports
const User = require("../../../models/auth/user.model");
const EventPlanner = require("../../../models/auth/eventPlanner.model");
const Merchant = require("../../../models/auth/merchant.model");
const checkAuth = require("../../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require ("multer");

//express app declaration
const auth = express();


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
auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));


//functions here

// signup user
auth.post('/signup/user', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
      const user = new User ({
        user_id: req.body.user_id,
        email: req.body.email,
        user_type: req.body.user_type,
        password: hash,
        state: req.body.state
      });
    console.log(user);
    user.save()
      .then( result => {
        res.status(200).json({
          message: 'user added successfully!',
          result: result
        });
      })
        .catch( err => {
          res.status(500).json({
            message: 'User signup was not successfull! Please try again!'
          });
        });
    });
});

// signup merchant
auth.post('/signup/merchant', (req, res, next) => {
  const merchant = new Merchant (req.body);
  console.log(merchant);
  merchant.save()
    .then (result => {
      res.status(200).json({
        message: 'Merchant added successfully!'
      });
    })
    .catch( err => {
      res.status(500).json({
        message: 'Merchant sign up was not successfull! Please try again!'
      });
    });
});

// signup evvent planner
auth.post('/signup/planner', (req, res, next) => {
  const eventPlanner = new EventPlanner (req.body);
  console.log(eventPlanner);
  eventPlanner.save()
    .then( result => {
      res.status(200).json({
        message: 'Event Planner added successfully!'
      });
    })
    .catch( err => {
      res.status(500).json({
        message: 'Event Plnner Signup was not successful! Please try again!'
      });
    });
});

// signup admin
auth.post('/signup/admin', (req, res, next) => {
  const user = new User (req.body);
  console.log(user);
  user.save()
    .then ( result => {
      res.status(200).json({
        message: 'Admin added successfully!'
      });
    })
    .catch( err => {
      res.status(500).json({
        message: 'Admin signup was not successful! Please try again!'
      });
    });
});


// add profile pic merchant
auth.post('/merchant/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  imagePath = url+ "/images/merchant/" + req.files[0].filename;
  res.status(200).json({
    profile_pic: imagePath
  });
});

// add profile pic event planner
auth.post('/planner/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  imagePath = url+ "/images/planner/" + req.files[0].filename;
  res.status(200).json({
    profile_pic: imagePath
  });
});

//edit merchant
auth.post('/merchant',checkAuth, (req, res, next) => {
  Merchant.updateOne({ user_id: req.userData.user_id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.body.profile_pic,
    nic: req.body.nic,
    email: req.body.email,
    contact_no: req.body.contact_no,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    postal_code: req.body.postal_code,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    isverified: req.body.isverified,
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'merchant updated successfully!',
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});


//edit event planner
auth.post('/planner',checkAuth, (req, res, next) => {
  EventPlanner.updateOne({ user_id: req.userData.user_id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.body.profile_pic,
    email: req.body.email,
    contact_no: req.body.contact_no,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    postal_code: req.body.postal_code,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
  })
  .then((result) => {
    res.status(200).json({
      message: 'event planner updated successfully!',
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});






//login user
auth.post('/signin', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
  .then( user => {
    if (!user){
      res.status(401).json(
        {
          message: 'Invalid username or password!',
        });
    }
    fetchedUser = user;
    console.log(user);
    return bcrypt.compare(req.body.password, user.password);
  })
  .then( result => {
    if (!result) {
      res.status(401).json(
        {
          message: 'Invalid username or password!',
        });
    }
    // json web token here
    const token = jwt.sign({
      email:fetchedUser.email,
      user_id: fetchedUser.user_id,
      user_type: fetchedUser.user_type
    },
    'secret_long_text_asdvBBGH##$$sdddgfg567$33',
    {expiresIn:"1h"});
    res.status(200).json({
      message: 'user authentication successfull!',
      token:token,
      expiersIn: 7200,
      user_type: fetchedUser.user_type,
    });
  })
  .catch(err => {
    res.status(401).json(
      {
        message: 'Invalid username or password!',
      });
  });
});


//get last user ID
auth.get('/last', (req, res, next) => {
  User.find(function (err, users) {
    var lastid;
    if(users.length){
      lastid = users[users.length-1].user_id;
    } else {
      lastid= 'U0';
    }
    console.log(lastid);
    if (err) return handleError(err);
    res.status(200).json(
      {
        lastid: lastid
      }
    );
  });
});

// get merchant logged in
auth.get('/get/merchant',checkAuth, (req, res, next) => {
  console.log(req.userData);
  Merchant.findOne({ user_id: req.userData.user_id}, function (err,merchant) {
    if (err) return handleError(err => {
      res.status(500).json(
        {
          message: 'Couldn\'t recieve Merchant Details! Please check your connetion'
        });
    });
    res.status(200).json(
      {
        message: 'Merchant recieved successfully!',
        merchant: merchant
      }
    );
  });
});

// get event planner logged in
auth.get('/get/planner',checkAuth, (req, res, next) => {

  EventPlanner.findOne({ user_id: req.userData.user_id }, function (err,planner) {
    if (err) return handleError(err => {
      res.status(500).json(
        {
          message: 'Couldn\'t recieve Event Planner Details! Please check your connetion'
        });
    });
    res.status(200).json(
      {
        message: 'Event Planner recieved successfully!',
        eventPlanner: planner
      }
    );
  });
});

// get header details
auth.get('/get/header',checkAuth, (req, res, next) => {
    if (req.userData.user_type == 'eventPlanner'){
      EventPlanner.findOne({ user_id: req.userData.user_id }, function (err,planner) {
        res.status(200).json(
          {
            user_type: req.userData.user_type,
            profile_pic: planner.profile_pic
          }
        );
      });
    }
    else {
    Merchant.findOne({ user_id: req.userData.user_id }, function (err,merchant) {
      res.status(200).json(
        {
          user_type: req.userData.user_type,
          profile_pic: merchant.profile_pic
        }
      );
    });
  }

});


module.exports = auth;
