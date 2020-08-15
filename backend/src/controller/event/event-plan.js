//model imports
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventPlan = express();

//middleware
eventPlan.use(bodyParser.json());
eventPlan.use(bodyParser.urlencoded({ extended: false }));

// REST API

// update tasks list when closing the component ( need to add service, product mgmt also)
eventPlan.post('/update',checkAuth, (req, res) => {
  console.log(req.body);
  // add updating services, products lists as well
  Event.updateOne({event_id: req.body.eventId}, {
     'event_segments.tasks' : req.body.tasks
   }).then( result => {
    console.log(result);
    res.status(200).json({ message: "Changes were successfully Updated!" });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Update were unsuccessfull! Please try again!" });
   });
});


module.exports = eventPlan;
