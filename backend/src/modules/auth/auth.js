//model imports
const User = require("../../../models/auth/user.model");
const EventPlanner = require("../../../models/auth/eventPlanner.model");
const Merchant = require("../../../models/auth/merchant.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require ("bcrypt");

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



//get selected user
auth.get('/signin/:id', (req, res, next) => {

  User.findOne({ user_id: req.params.id }, function (err,user) {
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'user recieved successfully!',
        user: user
      }
    );
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

module.exports = auth;
