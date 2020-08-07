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


// report: bookings - between 2 dates with year and month
spreport.get('/booking',checkAuth, (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);

  Booking.aggrogate(
    [
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
        '$project': {
          'year': {
            '$year': '$from_date'
          },
          'month': {
            '$month': '$from_date'
          },
          'booking_id': 1,
          'amount': 1,
          'amount_paid': 1,
          'commision_due': 1,
          'from_date': 1,
          'to_date': 1,
          'duration': 1,
          'user': 1,
          'serviceProvider': 1,
          'rate_type': 1,
          'business_name': 1,
          'service_category': 1,
          'state': 1,
          'service_name': 1,
          'business_name': 1
        }
      }, {
        '$sort': {
          'from_date': 1
        }
      }
    ]
  ).then( ( bookings) => {
    console.log(bookings);

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
