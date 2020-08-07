//model imports
const Order = require("../../model/product/order.model");
const Booking = require("../../model/service/booking.model");
const Appointment = require ("../../model/service/appointment.model");
const checkAuth = require("../../middleware/auth-check");
const Inquery = require("../../model/eventplanner/inquery.model");
const email = require("../common/mail");

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

// submit a review for booking
eventPlanner.post('/booking/review/:id',checkAuth, (req, res, next) => {
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

// submit a review for booking
eventPlanner.post('/order/review/:id',checkAuth, (req, res, next) => {
  Order.findOneAndUpdate({'order_id': req.params.id},{'review':req.body.msg}).then( (order) => {
    console.log(order);
    res.status(200).json(
      {
        message: 'Your Order reviewed Successfully!',
        review: order.review
      }
    );
  }).catch((err) => {
    console.log(err);
    res.status(500).json(
      { message: 'Order not Found! Review was not added!'}
      );
  })
});


// get methods

//get list of bookings
eventPlanner.get('/booking/get',checkAuth, (req, res, next) => {
  Booking.find({'user.user_id': req.userData.user_id},function (err, bookings) {
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


//get list of orders
eventPlanner.get('/order/get',checkAuth, (req, res, next) => {
  Order.find({'user.user_id': req.userData.user_id},function (err, orders) {
    console.log(orders);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No Orders Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'orders list recieved successfully!',
        orders: orders
      }
    );
  });
});


//get list of orders
eventPlanner.get('/inquery/get',checkAuth, (req, res, next) => {
  Inquery.find().then( (inquries) => {
    console.log(inquries);
    res.status(200).json(
      {
        message: 'inquery list recieved successfully!',
        inqueries: inquries
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Inquries Found!'}
      );
  });
});


//get list of orders
eventPlanner.post('/inquery/create',checkAuth, (req, res, next) => {
  var inqRes = req.body;
  inqRes['user_id'] = req.userData.user_id;

  const newInq = new Inquery(inqRes);

  newInq.save().then(
    (inquries) => {
      console.log(inquries);
      res.status(200).json(
        {
          message: 'inquery created successfully!',
        }
      ).catch( err => {
        console.log(err);
    res.status(500).json(
      { message: 'Inquery Creation unsuccessfull!'}
      );
  });
});
});


//get list of appointments
eventPlanner.get('/appoint/get',checkAuth, (req, res, next) => {
  Appointment.find({'user.user_id': req.userData.user_id},function (err, appointments) {
    console.log(appointments);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No Appointments Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'appoitment list recieved successfully!',
        appointments: appointments
      }
    );
  });
});


//get selected booking
eventPlanner.get('/booking/get/:id',checkAuth, (req, res, next) => {

  Booking.findOne({ 'booking_id': req.params.id }, function (err,recievedBooking) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while loading Booking Details! Please Retry!'}
        );
    });
    console.log(recievedBooking);
    res.status(200).json(
      {
        message: 'Booking recieved successfully!',
        booking: recievedBooking
      }
    );
  });
});

//get selected appointment
eventPlanner.get('/appoint/get/:id',checkAuth, (req, res, next) => {

  Appointment.findOne({ 'appoint_id': req.params.id }, function (err,recievedAppoint) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while loading Appointment Details! Please Retry!'}
        );
    });
    console.log(recievedAppoint);
    res.status(200).json(
      {
        message: 'Appointment recieved successfully!',
        appointment: recievedAppoint
      }
    );
  });
});

//get selected order
eventPlanner.get('/order/get/:id',checkAuth, (req, res, next) => {
  Order.findOne({ 'order_id': req.params.id }, function (err,recievedOrder) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while loading Order Details! Please Retry!'}
        );
    });
    console.log(recievedOrder);
    res.status(200).json(
      {
        message: 'Order recieved successfully!',
        order: recievedOrder
      }
    );
  });
});


// send an  email
eventPlanner.post("/mail", checkAuth, (req,res,next) => {
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







module.exports = eventPlanner;
