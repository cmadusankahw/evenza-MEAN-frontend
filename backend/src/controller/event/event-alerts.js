//model imports
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventAlert = express();

//middleware
eventAlert.use(bodyParser.json());
eventAlert.use(bodyParser.urlencoded({ extended: false }));

// REST API

 // get task alerts of a specific user
 eventAlert.get('/get/:id', checkAuth, (req, res) => {

  var today = new Date();
  console.log('today date: ', today);
  var alerts;
  var sendAlerts = [];

  Event.findOne({event_id: req.params.id}).then( result => {
    alerts = result.event_segments.tasks;
    console.log('recieved tasks: ',alerts);
    // find and update confirmed participant state
    for (const  doc of alerts) {

      // necessary date operations
      scheduledDate = new Date(doc.scheduled_from_date);
      var hours = Math.floor(-(today - scheduledDate) / 36e5);
      console.log ('Difference in hours :' ,hours);

      // date comparisons by hours
      if( hours> 0){
        if  (hours < 3) {
          sendAlerts.push({
            id: doc.task_id,
            heading: doc.title,
            message: doc.description,
            date: doc.scheduled_from_date,
            state: "danger"
          });
        } else if (hours < 24) {
          sendAlerts.push({
            id: doc.task_id,
            heading: doc.title,
            message: doc.description,
            date: doc.scheduled_from_date,
            state: "info"
          });
        } else if (hours < 72) {
          sendAlerts.push({
            id: doc.task_id,
            heading: doc.title,
            message: doc.description,
            date: doc.scheduled_from_date,
            state: "secondary"
          });
        }
      // creating alert

      };
    };

    // sorting according to the date
    sendAlerts.sort(function(a,b) {return (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0);} );

    // send finalized alerts array to the client
    console.log('final alerts : ',sendAlerts);
    res.status(200).json({
      alerts: sendAlerts,
      message: "Alerts retrived successfully!"
    });
    }).catch( err => {
      console.log(err);
      res.status(500).json({ message: "Alerts retrival Unsuccessful! Please try again!"});
     });
  });


module.exports = eventAlert;
