// imports
const Booking = require("../../model/service/booking.model");
const Appointment = require("../../model/service/appointment.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const spStat = express();

//middleware
spStat.use(bodyParser.json());
spStat.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get dashboard stats
spStat.get('/get', checkAuth, (req, res, next) => {

  var bookingQuery = Booking.find({ 'serviceProvider.serviceProvider_id': req.userData.user_id }).select('booking_id service_id service_name created_date state amount amount_paid');
  var appointQuery = Appointment.find({ 'serviceProvider.serviceProvider_id': req.userData.user_id }).select('appoint_id service_id service_name created_date state');

  bookingQuery.exec().then((resBooks) => {
    console.log(resBooks);
    appointQuery.exec().then((resAppoints) => {
      console.log(resAppoints);
      res.status(200).json(
        {
          message: 'Report Data recieved successfully!',
          bookings: resBooks,
          appoints: resAppoints
        });
    })

  }).catch(err => {
    console.log(err);
  })
});


module.exports = spStat;
