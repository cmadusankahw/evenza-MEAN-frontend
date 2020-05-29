//model imports
const Product = require("../../model/product/product.model");
const Service = require("../../model/service/service.model");
const Booking = require("../../model/eventplanner/booking.model");
const Appointment = require("../../model/eventplanner/appointment.model");
const Order = require("../../model/eventplanner/order.model");
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


//add new booking
eventPlanner.post('/booking/add',checkAuth, (req, res, next) => {
  var lastid;
  var serviceProviderId;

  // generate id
  Booking.find(function (err, bookings) {
    if(bookings.length){
      lastid = bookings[bookings.length-1].booking_id;
    } else {
      lastid= 'B0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'B' + mId.toString();
    console.log(lastid);
    if (err) return handleError(err => {
      res.status(500).json({
        message: 'Error occured while generating booking Id! Please Retry!'
      });
    });
  }).then( () => {
    // get service provider id
    Service.findOne({'service_id': req.body.service_id},function (err, recievedService) {
      serviceProviderId = recievedService.user_id;
      console.log(serviceProviderId);

      //update No of bookings in the service
      recievedService['no_of_bookings'] += 1;
      recievedService.update();
      if (err) return handleError(err => {
        res.status(500).json({
          message: 'Error occured while creating Booking! Please Retry!'
        });
      });
  });
}).then( () => {
    // save created booking
    let reqBooking = req.body;
    reqBooking['booking_id']= lastid;
    reqBooking['user_id']= req.userData.user_id;
    reqBooking['serviceProvider_id'] = serviceProviderId;
    const newBooking = new Booking(reqBooking);
    console.log(neweventPlanner);
    newBooking.save()
    .then(result => {
        res.status(200).json({
          message: 'Booking created successfully!',
          bookingId: result.booking_id // booking id as result
        });
      })
      .catch(err=>{
        res.status(500).json({
          message: 'Error occured while creating Booking! Please Retry!'
        });
      });
  });
 });


 //add new appointment
eventPlanner.post('/appoint/add',checkAuth, (req, res, next) => {
  var lastid;
  var serviceProviderId;

  // generate id
  Appointment.find(function (err, appoints) {
    if(appoints.length){
      lastid = appoints[appoints.length-1].appoint_id;
    } else {
      lastid= 'A0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'A' + mId.toString();
    console.log(lastid);
    if (err) return handleError(err => {
      res.status(500).json({
        message: 'Error occured while generating appointment Id! Please Retry!'
      });
    });
  }).then( () => {
    // get service provider id
    Service.findOne({'service_id': req.body.service_id},function (err, recievedService) {
      serviceProviderId = recievedService.user_id;
      console.log(serviceProviderId);

      //update No of appointments in the service
      recievedService['no_of_appoints'] += 1;
      recievedService.update();
      if (err) return handleError(err => {
        res.status(500).json({
          message: 'Error occured while creating Appointment! Please Retry!'
        });
      });
  });
}).then( () => {
    // save created appointment
    let reqAppoint = req.body;
    reqAppoint['appoint_id']= lastid;
    reqAppoint['user_id']= req.userData.user_id;
    reqAppoint['serviceProvider_id'] = serviceProviderId;
    const newAppoint = new Appointment(reqAppoint);
    console.log(newAppoint);
    newAppoint.save()
    .then(result => {
        res.status(200).json({
          message: 'Appointment created successfully!',
          bookingId: result.appoint_id // appointment id as result
        });
      })
      .catch(err=>{
        res.status(500).json({
          message: 'Error occured while creating Appointment! Please Retry!'
        });
      });
  });
 });


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

//get list of eventPlanners for search
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

//get list of eventPlanners for search
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
      res.status(500).json(
        { message: 'Error while loading Booking Details! Please Retry!'}
        );
    });
    res.status(200).json(
      {
        message: 'Booking recieved successfully!',
        booking: recievedBooking
      }
    );
  });
});

//get selected appointment
eventPlanner.get('/appoint/get/:id', (req, res, next) => {

  Appointment.findOne({ booking_id: req.params.id }, function (err,recievedAppoint) {
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'Error while loading Appointment Details! Please Retry!'}
        );
    });
    res.status(200).json(
      {
        message: 'Appointment recieved successfully!',
        booking: recievedAppoint
      }
    );
  });
});




module.exports = eventPlanner;
