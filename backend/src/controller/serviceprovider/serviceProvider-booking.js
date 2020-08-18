// imports
const Booking = require("../../model/service/booking.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const spBooking = express();

//middleware
spBooking.use(bodyParser.json());
spBooking.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get list of bookings
spBooking.get('/get', checkAuth, (req, res, next) => {
  Booking.find({ 'serviceProvider.serviceProvider_id': req.userData.user_id }).then( (bookings) => {
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
      { message: 'No bookings Found!' }
    );
  })
});

//get selected booking
spBooking.get('/get/:id', checkAuth, (req, res, next) => {

  Booking.findOne({ 'booking_id': req.params.id }).then( (recievedBooking) =>  {
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
      { message: 'Error while loading Booking Details! Please Retry!' }
    );
  })
});


//get calendar bookings scheduled by service providers
spBooking.get('/cal/get', checkAuth, (req, res, next) => {
  Booking.find({ 'serviceProvider.serviceProvider_id': req.userData.user_id, 'state': { $ne: 'cancelled' } }).then( (recievedBookings) => {
    console.log(recievedBookings);
    res.status(200).json(
      {
        message: 'Appointment recieved successfully!',
        bookings: recievedBookings
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while loading Calendar Booking Details! Please Retry!' }
    );
  })
});

//update booking state
spBooking.post('/edit', checkAuth, (req, res, next) => {

  Booking.findOneAndUpdate({ 'booking_id': req.body.bookingId }, { 'state': req.body.state }).then( (recievedBooking) => {
    console.log(recievedBooking);
    res.status(200).json(
      {
        message: 'Booking state updated successfully!',
        booking: recievedBooking
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while updating Booking State! Please Retry!' }
    );
  })
});

module.exports = spBooking;
