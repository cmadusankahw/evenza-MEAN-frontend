//model imports
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

// export app imports
const eventPlannerImg = require("./eventPlanner-img");
const eventPlannerBooking = require("./eventPlanner-booking");
const eventPlannerOrder = require("./eventPlanner-order");
const eventPlannerAppoint = require("./eventPlanner-appoint");
const eventPlannerInquery = require("./eventPlanner-inquery");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventPlanner = express();

//middleware
eventPlanner.use(bodyParser.json());
eventPlanner.use(bodyParser.urlencoded({ extended: false }));

// express app includes
eventPlanner.use('/img', eventPlannerImg);
eventPlanner.use('/booking', eventPlannerBooking);
eventPlanner.use('/order', eventPlannerOrder);
eventPlanner.use('/appoint', eventPlannerAppoint);
eventPlanner.use('/inquery', eventPlannerInquery);


// REST API

//get event planner id
eventPlanner.get('/id/get', checkAuth, (req, res, next) => {
  res.status(200).json(
    {
      id: req.userData.user_id
    });
});

// send an  email
eventPlanner.post("/mail", checkAuth, (req,res,next) => {
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


module.exports = eventPlanner;
