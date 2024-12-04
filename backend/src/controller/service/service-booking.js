//model imports
const Service = require("../../model/service/service.model");
const Booking = require("../../model/service/booking.model");
const EventPlanner = require ("../../model/auth/eventPlanner.model");
const Merchant = require("../../model/auth/merchant.model");
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");
const mailHeader = require("../common/mail-header");
const mailFooter = require("../common/mail-footer");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const serviceBooking = express();

//middleware
serviceBooking.use(bodyParser.json());
serviceBooking.use(bodyParser.urlencoded({ extended: false }));

// REST API

// check booking availability  // need to modify
serviceBooking.post('/check', (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);
  console.log('converted dates: ', reqFromDate, reqToDate);
  // count to check with capacity
  var count = 0;
  // returning availability state
  let availability = false;

  Booking.aggregate([
    {
      '$match': {
        'from_date': {
          '$gte': new Date(reqFromDate)
        },
        'to_date': {
          '$lte': new Date(reqToDate)
        }
      }
    }, {
      '$count': 'booking_id'
    }
  ]).then( result => {
      console.log('found bookings :' , result);
        if (result[0]) {
          count= result[0].booking_id + 1;
        }
        console.log(count);
   Service.countDocuments({service_id: req.body.serviceId, capacity: {$gte: count}})
    .then(result2 => {
      console.log('after checking capacity: ',result2);
      if (result2>0){
        availability = true;
      };
      res.status(200).json({
        message: 'availability information recieved successfully!',
        availability: availability
      });
    }).catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while checking for bookiing information!'
      });
    });
  }).catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while checking for bookiing information!'
      });
    });
});

//add new booking
serviceBooking.post('/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqBooking = req.body;
  let serviceProviderId;

  // generate id
  Booking.find().select('booking_id').sort('booking_id').then( (bookings) => {
    if(bookings.length){
      lastid = bookings[bookings.length-1].booking_id;
    } else {
      lastid= 'B0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'B' + mId.toString();
    console.log(lastid);
    reqBooking['booking_id']= lastid; // last id

    // get service provider id and incrementing no_of_bookings
    Service.findOneAndUpdate({'service_id': req.body.service_id},{$inc : {'no_of_bookings':1} }).then( (recievedService) => {
    console.log(recievedService);
    serviceProviderId = recievedService.user_id
    // get customer name
    EventPlanner.findOne({'user_id': req.userData.user_id} ).then((recievedPlanner)=>{
        console.log(recievedPlanner);
        reqBooking.user = {
          'user_id':req.userData.user_id,
          'email': recievedPlanner.email,
          'name': recievedPlanner.first_name + ' ' + recievedPlanner.last_name
        }
        // get service Provider details
        Merchant.findOne({'user_id': serviceProviderId}).then( (recievedMerchant) => {
          reqBooking.serviceProvider = {
            'serviceProvider_id':serviceProviderId,
            'email': recievedMerchant.email,
            'name': recievedMerchant.first_name + ' ' + recievedMerchant.last_name
          };
          const mail= {
            email:recievedMerchant.email,
            subject: "New Booking on " + req.body.service_name,
            html: createHTML(req.body)
          };
          console.log(mail);
          const newBooking = new Booking(reqBooking);
          console.log(' final booking ', newBooking);
          // save booking
          newBooking.save().then(result => {
            email.sendMail(mail, () => {});
            res.status(200).json({
                message: 'Booking created successfully!',
                bookingId: result.booking_id // booking id as result
            });
          }).catch (err => {
            console.log('then 5', err);
            res.status(500).json({
              message: 'Error occured while creating Booking! Please Retry!'
            });
          });
      }).catch (err => {
      console.log('then 4 ', err);
      res.status(500).json({
        message: 'Error occured while creating Booking! Please Retry!'
      });
    });
    }).catch (err => {
      console.log('then 3 ', err);
      res.status(500).json({
        message: 'Error occured while creating Booking! Please Retry!'
      });
    }); // then 3
 }).catch (err => {
   console.log('then 2 ', err);
   res.status(500).json({
    message: 'Error occured while creating Booking! Please Retry!'
  });
 });
}).catch (err => {
  console.log('then 1 ', err);
  res.status(500).json({
   message: 'Error occured while creating Booking! Please Retry!'
 });
});
});


//add new calendar booking
serviceBooking.post('/cal/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqBooking = req.body;
  // generate id
  Booking.find().select('booking_id').sort('booking_id').then( (bookings) => {
    if(bookings.length){
      lastid = bookings[bookings.length-1].booking_id;
    } else {
      lastid= 'B0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'B' + mId.toString();
    console.log(lastid);
    reqBooking['booking_id']= lastid; // last id
    // creating the user and service provider
    reqBooking['user'] = {user_id:'', email:'' ,name: ''};
    reqBooking['serviceProvider'] = {
      serviceProvider_id : req.userData.user_id,
      email: req.userData.email,
      name: null
    };

    // finalized booking
    const newBooking = new Booking(reqBooking);
    console.log(' final booking ', newBooking);

    // save booking
    newBooking.save().then(result => {
      res.status(200).json({
          message: 'Booking created successfully!',
          bookingId: result.booking_id // booking id as result
      });
    }).catch (err => {
      console.log('then 2 ', err);
      res.status(500).json({
        message: 'Error occured while creating Booking! Please Retry!'
      });
    });
  }).catch (err => {
    console.log('then 2 ', err);
    res.status(500).json({
      message: 'Error occured while creating Booking! Please Retry!'
    });
  });
});


// manipulat event when creating a booking
serviceBooking.post('/event', (req, res, next) => {

  var serviceCategories;

  Event.findOne({ event_id : req.body.event_id})
  .then( result => {
    console.log(result);
      // filter booked service from service categories
      serviceCategories = result.service_categories;
      serviceCategories = serviceCategories.filter(obj => obj.category !== req.body.service_category);

      // updating the event
       Event.updateOne({event_id: req.body.event_id},{
          $push : {'event_segments.services' : {
            service_id: req.body.service_id,
            service_name:  req.body.service_name,
            service_category:  req.body.service_category,
            booking_id:  req.body.booking_id,
            appoint_id: null,
            allocated_budget:  req.body.allocated_budget,
            spent_budget:  req.body.spent_budget,
            booking_from_date:  req.body.booking_from_date,
            booking_to_date:  req.body.booking_to_date,
            appointed_date: null,
            state: 'booked'
          }},
         'service_categories': serviceCategories,
          $inc: { 'total_spent_budget': req.body.spent_budget }
       }).then( (updatedResult) => {
         console.log(updatedResult);
      res.status(200).json({
        message: 'booking deatils updated to the event successfully!!',
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while creating your booking! Please try again!'
      });
    });
}).catch(err=>{
  console.log(err);
  res.status(500).json({
    message: 'Error occured while creating your booking! Please try again!'
  });
});
});

//get list of bookings
serviceBooking.get('/get',checkAuth, (req, res, next) => {
  Booking.find({state: 'pending'}).then ( (bookings) => {
    console.log(bookings);
    res.status(200).json(
      {
        message: 'booking list recieved successfully!',
        bookings: bookings
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No bookings Found!'}
      );
  })
});


// create custom HTML
function createHTML(content) {
    const message = mailHeader.mailHeader +  "<h3> You have new Booking on " + content.service_name + "</h3><hr><h4> Booking ID : <b> " +
    content.booking_id
    + "</b></h4><h4>Booked Date : <b> " +
   content.from_date.slice(0,10)
    + " </b></h4><h4>Duration : <b> " + content.duration + ' ' + content.rate_type.slice(1) + "(s) </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
    + mailFooter.mailFooter;
   return message;

  }

module.exports = serviceBooking;
