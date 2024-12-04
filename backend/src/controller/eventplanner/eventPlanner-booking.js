//model imports
const Booking = require("../../model/service/booking.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventPlannerBooking = express();

//middleware
eventPlannerBooking.use(bodyParser.json());
eventPlannerBooking.use(bodyParser.urlencoded({ extended: false }));

// REST API

// submit a review for booking
eventPlannerBooking.post('/review/:id',checkAuth, (req, res, next) => {
  Booking.findOneAndUpdate({'booking_id': req.params.id},{'review':req.body.msg}).then( (booking) => {
    console.log(booking);
    res.status(200).json(
      {
        message: 'Your booking reviewed Successfully!',
        review: booking.review
      }
    );
  }).catch( (err) => {
    console.log(err);
    res.status(500).json(
      { message: 'Booking not Found! Review was not added!'}
      );
  })
});


//get list of bookings
eventPlannerBooking.get('/get',checkAuth, (req, res, next) => {
  Booking.find({'user.user_id': req.userData.user_id}).then( (bookings) => {
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


//get selected booking
eventPlannerBooking.get('/get/:id',checkAuth, (req, res, next) => {

  Booking.findOne({ 'booking_id': req.params.id }).then ( (recievedBooking) => {
    console.log(recievedBooking);
    res.status(200).json(
      {
        message: 'Booking recieved successfully!',
        booking: recievedBooking
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while loading Booking Details! Please Retry!'}
      );
  })
});


module.exports = eventPlannerBooking;
