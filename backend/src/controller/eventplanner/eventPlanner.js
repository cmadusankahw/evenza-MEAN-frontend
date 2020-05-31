//model imports
const Product = require("../../model/product/product.model");
const Service = require("../../model/service/service.model");
const Order = require("../../model/product/order.model");
const Booking = require("../../model/service/booking.model");
const Appointment = require ("../../model/service/appointment.model");
const Merchant = require("../../model/auth/merchant.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");

//express app declaration
const eventPlanner = express();


// multer setup for image upload
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
  'image/gif' : 'gif'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid Image");
    if(isValid){
      error=null;
    }
    cb(error,"src/assets/images/eventPlanner");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
eventPlanner.use(bodyParser.json());
eventPlanner.use(bodyParser.urlencoded({ extended: false }));

 // change booking state


 // change appointment state


// add eventPlanner photos
eventPlanner.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let imagePaths = [];
    for (let f of req.files){
      imagePaths.push(url+ "/images/eventPlanner/" + f.filename);
    }
    res.status(200).json({
      imagePaths: imagePaths
    });

});


// get methods

//get list of bookings
eventPlanner.get('/booking/get',checkAuth, (req, res, next) => {
  Booking.find({'user_id': req.userData.user_id},function (err, bookings) {
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

//get list of appointments
eventPlanner.get('/appoint/get',checkAuth, (req, res, next) => {
  Appointment.find({'user_id': req.userData.user_id},function (err, appointments) {
    console.log(appointments);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No Appointments Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'booking list recieved successfully!',
        appointments: appointments
      }
    );
  });
});


//get selected booking
eventPlanner.get('/booking/get/:id', (req, res, next) => {

  Booking.findOne({ booking_id: req.params.id }, function (err,recievedBooking) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while loading Booking Details! Please Retry!'}
        );
    });

  }).then((recievedBooking) => {
    Service.findOne({'service_id': recievedBooking.service_id}, function (err, recievedService){
      if (err) return handleError(err => {
        console.log(err);
        res.status(500).json(
          { message: 'Error while loading Booking Details! Please Retry!'}
          );
      });
      recievedBooking = recievedBooking.toObject();
      recievedBooking.service_name = recievedService.service_name;
      recievedBooking.business_name = recievedService.business_name;
      recievedBooking.rate_type = recievedService.rate_type;
      recievedBooking.event_name = 'Not Assigned'; // to be modified
      console.log(recievedBooking);
      res.status(200).json(
        {
          message: 'Booking recieved successfully!',
          booking: recievedBooking
        }
      );
    });
  });
});

//get selected appointment
eventPlanner.get('/appoint/get/:id', (req, res, next) => {

  Appointment.findOne({ appoint_id: req.params.id }, function (err,recievedAppoint) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while loading Appointment Details! Please Retry!'}
        );
    });
  }).then((recievedAppoint) => {
    Service.findOne({'service_id': recievedAppoint.service_id}, function (err, recievedService){
      if (err) return handleError(err => {
        console.log(err);
        res.status(500).json(
          { message: 'Error while loading Booking Details! Please Retry!'}
          );
      });
      recievedAppoint = recievedAppoint.toObject();
      recievedAppoint.service_name = recievedService.service_name;
      recievedAppoint.business_name = recievedService.business_name;
      recievedAppoint.rate_type = recievedService.rate_type;
      recievedAppoint.event_name = 'Not Assigned'; // to be modified
      console.log(recievedAppoint);
      res.status(200).json(
        {
          message: 'Appointment recieved successfully!',
          appointment: recievedAppoint
        }
      );
    });
  });
});



module.exports = eventPlanner;
