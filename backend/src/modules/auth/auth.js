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

//express app declaration
const auth = express();

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
            error: err
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
        error: err
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
        error: err
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
        error: err
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
          message: 'user authentication failed!',
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
          message: 'user authentication failed!',
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
      expiersIn: 3600,
      user_type: fetchedUser.user_type,
    });
  })
  .catch(err => {
    console.log('the error :', err);
    res.status(401).json(
      {
        message: 'user authentication failed!',
        error: err
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
    if (err) return handleError(err);
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
    if (err) return handleError(err);
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
    if (req.userData.user_type == 'planner'){
      EventPlanner.findOne({ user_id: req.userData.user_id }, function (err,planner) {
        if (err) return handleError(err);
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
      if (err) return handleError(err);
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
