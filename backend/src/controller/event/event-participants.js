//model imports
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventParticipants = express();

//middleware
eventParticipants.use(bodyParser.json());
eventParticipants.use(bodyParser.urlencoded({ extended: false }));

// REST API

// update tasks list when closing the component ( need to add service, product mgmt also)
eventParticipants.post('/update',checkAuth, (req, res) => {
  console.log(req.body);
  // add updating services, products lists as well
  Event.updateOne({event_id: req.body.eventId}, {
     'participants.participants' : req.body.participants,
     'state':'unpublished',
     $set: { 'alerts.0': req.body.invitation}
   }).then( result => {
    console.log(result);
    res.status(200).json({ message: "Changes were successfully Updated!" });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Update were unsuccessfull! Please try again!" });
   });
});


// register a new participant to an open type event
eventParticipants.post('/open/add', (req, res) => {
  // add updating services, products lists as well
  Event.updateOne({event_id: req.body.eventId}, {
     $push: { 'participants.participants': {
      participant_id: req.body.participant.participant_id,
      first_name: req.body.participant.first_name,
      last_name: req.body.participant.last_name,
      email: req.body.participant.email,
      state: 'accepted',
     }},
    $inc: {'participants.approved_participants' : 1}
   }).then( result => {
    console.log(result);

    var mail= {
        email:req.body.participant.email,
        subject: ' Your Registration Successful! | Evenza Smart Event Management Platform',
        html: createOpenHTML(req.body.participant.first_name, req.body.eventId)
      };
      console.log( 'new open Mail:' , mail);
      email.sendMail(mail, () => {});
      res.status(200).json({ message: "Your Registration was Successful! Thank you for using Evenza!" });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Registration was unsuccessfull! Please try again!" });
   });
});


// create event invitation HTML with confirmation link
function createOpenHTML(name, eventId) {
  const message = "<h3> Registration Successfull on Event! </h3><br> Dear " + name + " , <br><br>"
  +"<br><br> you have successfully registered with the Evenza Event Management Platfrom to the selected event.<hr> <b> Please visit  <a href='https://evenza.biz/events/register/"+ eventId
  + "' target='_blank'> Registered Event</a> for more details.</b> </br>"
  + "<div> <hr> Thank You, <br> Your Sincere, <br><br> Event Organizer at Evenza</div>"
  return message;
 }



module.exports = eventParticipants;
