const Service = require ("../../model/service/service.model");
const Merchant = require ("../../model/auth/merchant.model");
const Booking = require("../../model/service/booking.model");
const Appointment = require ("../../model/service/appointment.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const spreport = express();

//middleware
spreport.use(bodyParser.json());
spreport.use(bodyParser.urlencoded({ extended: false }));


//get list of bookings
spreport.get('/booking/get',checkAuth, (req, res, next) => {
  Booking.find({'spreport.spreport_id': req.userData.user_id},function (err, bookings) {
    console.log(bookings);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No bookings Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'booking list recieved successfully!',
        bookings: bookings
      }
    );
  });
});


// post methods

//update booking state
spreport.post('/booking/edit',checkAuth, (req, res, next) => {

  Booking.findOneAndUpdate({ 'booking_id': req.body.bookingId },{'state':req.body.state}, function (err,recievedBooking) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while updating Booking State! Please Retry!'}
        );
    });
    console.log(recievedBooking);
    res.status(200).json(
      {
        message: 'Booking state updated successfully!',
        booking: recievedBooking
      }
    );
  });
});



// send an  email
spreport.post("/mail", checkAuth, (req,res,next) => {
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


module.exports = spreport;
