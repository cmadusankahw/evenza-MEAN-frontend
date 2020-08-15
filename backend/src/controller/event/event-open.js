//model imports
const Event = require("../../model/event/event.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventOpen = express();

//middleware
eventOpen.use(bodyParser.json());
eventOpen.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get list of events for event cards
eventOpen.get('/get',(req, res) => {

  var query =  Event.find({'event_type' :'open', 'state' : 'published'})
     .select('event_id event_title description event_category from_date to_date location.homeTown no_of_participants feature_img state');

  query.exec().then ((events) => {
     console.log(events);
     res.status(200).json(
       {
         message: 'event list recieved successfully!',
         events: events
       }
     );
   }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No matching events Found! Please check your filters again!'}
      );
   })
 });


module.exports = eventOpen;
