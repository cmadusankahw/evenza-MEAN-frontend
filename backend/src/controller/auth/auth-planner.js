//model imports
const EventPlanner = require("../../model/auth/eventPlanner.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const authPlanner = express();

//middleware
authPlanner.use(bodyParser.json());
authPlanner.use(bodyParser.urlencoded({ extended: false }));

//REST API

// signup event planner
authPlanner.post('/signup', (req, res, next) => {
  const eventPlanner = new EventPlanner (req.body);
  console.log(eventPlanner);
  eventPlanner.save()
    .then( result => {
      res.status(200).json({
        message: 'Event Planner added successfully!'
      });
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        message: 'Event Plnner Signup was not successful! Please try again!'
      });
    });
});


//edit event planner
authPlanner.post('/edit',checkAuth, (req, res, next) => {
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
    console.log(err);
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});

// get event planner logged in
authPlanner.get('/get',checkAuth, (req, res, next) => {

  EventPlanner.findOne({ user_id: req.userData.user_id }).then( (planner) => {
    res.status(200).json(
      {
        message: 'Event Planner recieved successfully!',
        eventPlanner: planner
      }
    );
  }).then ( err =>{
    console.log(err);
    res.status(500).json(
      {
        message: 'Couldn\'t recieve Event Planner Details! Please check your connetion'
      });
  })
});


module.exports = authPlanner;
