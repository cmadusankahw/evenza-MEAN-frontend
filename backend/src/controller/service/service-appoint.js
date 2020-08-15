//model imports
const Service = require("../../model/service/service.model");
const Appointment = require("../../model/service/appointment.model");
const EventPlanner = require ("../../model/auth/eventPlanner.model");
const Merchant = require("../../model/auth/merchant.model");
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const serviceAppoint = express();


//middleware
serviceAppoint.use(bodyParser.json());
serviceAppoint.use(bodyParser.urlencoded({ extended: false }));

// REST API

//add new appointment
serviceAppoint.post('/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqAppoint = req.body;
  let serviceProviderId;

  // generate id
  Appointment.find().select('appoint_id').then( (appoints) => {
    if(appoints.length){
      lastid = appoints[appoints.length-1].appoint_id;
    } else {
      lastid= 'A0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'A' + mId.toString();
    console.log(lastid);
    reqAppoint['appoint_id']= lastid; // last id

    // get service provider id and incrementing no_of_appoints
    Service.findOneAndUpdate({'service_id': req.body.service_id},{$inc : {'no_of_appoints':1} }).then ((recievedService) => {
      console.log(recievedService);
      serviceProviderId = recievedService.user_id; // serviceProvider id

    // get customer data
    EventPlanner.findOne({'user_id': req.userData.user_id}).then( (recievedPlanner) => {
      console.log(recievedPlanner);
      reqAppoint.user = {
        'user_id':req.userData.user_id,
        'email': recievedPlanner.email,
        'name': recievedPlanner.first_name + ' ' + recievedPlanner.last_name
      };

      // get serviceProvider data
      Merchant.findOne({'user_id': serviceProviderId}).then( (recievedMerchant) => {
          reqAppoint.serviceProvider = {
            'serviceProvider_id':serviceProviderId,
            'email': recievedMerchant.email,
            'name': recievedMerchant.first_name + ' ' + recievedMerchant.last_name
          }
         // creating mail
          const mail= {
            email:recievedMerchant.email,
            subject: "New Appointment on " + req.body.service_name,
            html: createHTML(req.body)
          }
          console.log(mail);
          const newAppoint = new Appointment(reqAppoint);
          console.log(' final appointment ', newAppoint);

          // saving final appointment
          newAppoint.save().then(result => {
            email.sendMail(mail, () => {});
            res.status(200).json({
                message: 'Appointment created successfully!',
                appointId: result.appoint_id // booking id as result
            });
          }).catch (err => {
            console.log('then 5 ', err);
            res.status(500).json({
              message: 'Error occured while creating Appointment! Please Retry!'
            });
          });
         }).catch (err => {
          console.log('then 4 ', err);
          res.status(500).json({
            message: 'Error occured while creating Appointment! Please Retry!'
          });
        });
      }).catch (err => {
        console.log('then 3 ', err);
        res.status(500).json({
          message: 'Error occured while creating Appointment! Please Retry!'
        });
      });
    }).catch (err => {
      console.log('then 2 ', err);
      res.status(500).json({
        message: 'Error occured while creating Appointment! Please Retry!'
      });
    });
 }).catch (err => {
   console.log('then 1 ', err);
   res.status(500).json({
    message: 'Error occured while creating Appointment! Please Retry!'
  });
 });
});


// manipulat event when creating a appointment
serviceAppoint.post('/event', (req, res, next) => {
  console.log(req.body);
  Event.findOneAndUpdate({ event_id : req.body.event_id}, {
    $push : {'event_segments.services' : {
      service_id: req.body.service_id,
      service_name:  req.body.service_name,
      service_category:  req.body.service_category,
      booking_id: null,
      appoint_id: req.body.appoint_id,
      allocated_budget:  0,
      spent_budget:  0,
      booking_from_date:  null,
      booking_to_date:  null,
      appointed_date: req.body.appointed_date,
      state: 'appointed'
    }}})
  .then( result => {
    console.log(result);
      res.status(200).json({
        message: 'appointment deatils updated to the event successfully!!',
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while creating your appointment! Please try again!'
      });
    });
});



// create custom HTML
function createHTML(content) {
    const message = "<h3> You have new "+ mailType + " on " + content.service_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.appoint_id
    + "</b></h4><h4>Appointed Date : <b> " +
   content.appointed_date.slice(0,10)
    + " </b></h4><h4>Appointed Time : <b> " + content.appointed_date.slice(11,16) + " Hrs </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;

  }


module.exports = serviceAppoint;
