//model imports
const User = require("../../model/auth/user.model");
const Merchant = require("../../model/auth/merchant.model");
const Admin = require("../../model/admin/admin.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const checkAuth = require("../../middleware/auth-check");

// express imports
const authUser = require("./auth-user");
const authMerchant = require("./auth-merchant");
const authPlanner = require("./auth-planner");
const authAdmin = require("./auth-admin");
const authBusiness = require("./auth-business");
const AuthImg = require("./auth-img");
const AuthVerify = require("./auth-verify");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require ("bcrypt");
const jwt = require("jsonwebtoken");

//express app declaration
const auth = express();

//middleware
auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));

// express app use
auth.use('/user', authUser);
auth.use('/merchant', authMerchant);
auth.use('/planner', authPlanner);
auth.use('/admin', authAdmin);
auth.use('/business', authBusiness);
auth.use('/img', AuthImg);
auth.use('/verify', AuthVerify);


//REST API

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
      expiersIn: 15000,
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



// get header details
auth.get('/header',checkAuth, (req, res, next) => {
  if (req.userData.user_type == 'eventPlanner'){
    EventPlanner.findOne({ user_id: req.userData.user_id }, function (err,planner) {
      res.status(200).json(
        {
          user_type: req.userData.user_type,
          user_name: planner.first_name,
          profile_pic: planner.profile_pic
        }
      );
    });
  }
  else if  (req.userData.user_type == 'admin') {
  Admin.findOne({ user_id: req.userData.user_id }, function (err,admin) {
    res.status(200).json(
      {
        user_type: req.userData.user_type,
        user_name: admin.first_name,
        profile_pic: admin.profile_pic
      }
    );
  });
} else {
  Merchant.findOne({ user_id: req.userData.user_id }, function (err,merchant) {
    res.status(200).json(
      {
        user_type: req.userData.user_type,
        user_name: merchant.first_name,
        profile_pic: merchant.profile_pic
      }
    );
  });
}

});

//get last user ID
auth.get('/last', (req, res, next) => {
  User.find(function (err, users) {
    var lastid;
    if(users.length){
      lastid = users[users.length-1].user_id;
      var eId = +(lastid.slice(1));
      lastid = ('U' + (++eId).toString());
    } else {
      lastid= 'U0';
    }
    if (err) return handleError(err);
    res.status(200).json(
      {
        lastid: lastid
      }
    );
  });
});

module.exports = auth;
