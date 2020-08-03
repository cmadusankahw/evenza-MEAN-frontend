//model imports
const Admin = require("../../model/admin/admin.model");
const Booking = require("../../model/service/booking.model");
const Order = require("../../model/product/order.model");
const ServiceCategories = require("../../model/service/categories.model");
const Productcategories = require("../../model/product/categories.model");
const DeliveryServices = require("../../model/product/deliveryService.model");
const EventCategories = require("../../model/event/categories.model");
const Merchant = require("../../model/auth/merchant.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const checkAuth = require("../../middleware/auth-check");
const Login = require("../../../data/user/emailAuthentication.json");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const nodemailer = require("nodemailer");
var backup = require('mongodb-backup');
var restore = require('mongodb-restore');
const cron = require("node-cron"); // running scheduled tasks

//express app declaration
const admin = express();


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
    cb(error,"src/assets/images/admin");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({ extended: false }));

// running scheduled payment updates

// variables

var i=0;

// schedule tasks to be run on the server - update payments
cron.schedule("* * 28 * *", function() {

  Admin.findOne().select('payment_details').then( result => {
    var paymentDetails = result.payment_details;
    var merchantIndex = 0;
    var paysIndex = 0;
    var dueAmt = 0;
    var timeStamp;
    for(let pd of paymentDetails) {
        for (let p of pd.pays) {
          dueAmt += p.due_amount;
          timeStamp = p.timestamp;
          paysIndex++;
        }
        // deduct due amount and pass to the latest month
        for (let i =0; i< paysIndex; i++){
          paymentDetails[merchantIndex].pays[i].due_amount = 0;
        }
        // create new entry to hold updated payment details
        paymentDetails[merchantIndex].pays[paysIndex]= {
          due_amount: dueAmt,
          paid_amount: 0,
          paid_date: null,
          timestamp: {
            year: timeStamp.year,
            month: timeStamp.month +1,
          }
        }
        merchantIndex++;
    }
    console.log(paymentDetails);
    Admin.updateOne({},{
      'payment_details' : paymentDetails
    }).then ( (res2) => {
      console.log(res2);
    }).catch ( err => {
      console.log(err);
    })
  }).catch( err => {
    console.log(err);
  })
});


// add admin photos
admin.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let image01Path, image02Path, image03Path = null;
    let imagePaths = [];
    for (let f of req.files){
      imagePaths.push(url+ "/images/admin/" + f.filename);
    }
    res.status(200).json({imagePaths: imagePaths});

});

// update admin payment details
// auto update once id paid, or -> paid_amount
// auto update on month end -> due amount
admin.post('/update/payments', (req, res, next) => {
  Admin.updateOne({ user_id: req.userData.user_id}, {
      // update data
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'admin profile updated successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});


// create a backup
admin.post('/backup/create', (req, res, next) => {
  // const url = req.protocol + '://' + req.get("host");
  backup({
    uri: 'mongodb://localhost:27017/evenza', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: req.body.path + '/' + new Date().toString().trim(' ')+ '/'
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'backup created successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Backup failed! Please Try Again!'
    });
  });
});

// restore from  a backup
admin.post('/backup/restore', (req, res, next) => {
  // const url = req.protocol + '://' + req.get("host");
  restore({
    uri: 'mongodb://localhost:27017/evenza', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: req.body.path +'/evenza'
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'backup restored successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Restore failed! Please Try Again!'
    });
  });
});

// get mehods

// get merchant logged in
admin.get('/get/dbdata',checkAuth, (req, res, next) => {

  var eventPlannerCount = EventPlanner.countDocuments();

  var userCount =  Merchant.aggregate([
    { "$facet": {
      "ServiceProvider": [
        { "$match" : { "user_type": 'serviceProvider'}},
        { "$count": "ServiceProvider" },
      ],
      "Seller": [
        { "$match" : { "user_type": 'seller'}},
        { "$count": "Seller" }
      ],
    }},
    { "$project": {
      "sellers": { "$arrayElemAt": ["$Seller.Seller", 0] },
      "serviceProviders": { "$arrayElemAt": ["$ServiceProvider.ServiceProvider", 0] },
    }}
  ]);

  var bookingCount =  Booking.aggregate([
    { "$facet": {
      "Pending": [
        { "$match" : { "state": 'pending'}},
        { "$count": "Pending" },
      ],
      "Completed": [
        { "$match" : { "state": 'completed'}},
        { "$count": "Completed" }
      ],
      "Cancelled": [
        { "$match" : { "state": 'cancelled'}},
        { "$count": "Cancelled" }
      ],
    }},
    { "$project": {
      "pending": { "$arrayElemAt": ["$Pending.Pending", 0] },
      "completed": { "$arrayElemAt": ["$Completed.Completed", 0] },
      "cancelled": { "$arrayElemAt": ["$Cancelled.Cancelled", 0] },
    }}
  ]);


  var orderCount =  Order.aggregate([
    { "$facet": {
      "Pending": [
        { "$match" : { "state": 'pending'}},
        { "$count": "Pending" },
      ],
      "Delivered": [
        { "$match" : { "state": 'delivered'}},
        { "$count": "Delivered" }
      ],
      "Cancelled": [
        { "$match" : { "state": 'cancelled'}},
        { "$count": "Cancelled" }
      ],
    }},
    { "$project": {
      "pending": { "$arrayElemAt": ["$Pending.Pending", 0] },
      "delivered": { "$arrayElemAt": ["$Delivered.Delivered", 0] },
      "cancelled": { "$arrayElemAt": ["$Cancelled.Cancelled", 0] },
    }}
  ]);



  var dashboardData = {
    bookings: {},
    orders: {},
    users: {}
  }

  userCount.exec().then( (resUsers) => {
    dashboardData.users = resUsers;
    orderCount.exec().then( (resOrders) => {
      dashboardData.orders = resOrders;
      bookingCount.exec().then ( (resBookings)=> {
        dashboardData.bookings = resBookings;
        console.log(dashboardData);
        res.status(200).json(
          {
            message: 'Dashboard data Recieved Successfully!',
            dashboardData: dashboardData
          }
        );
      })
    })
  }).catch( (err) => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Something went wrong while recieving Dashboard Details!'
      });
  });
});


// get admin payments
admin.get('/get/payments',checkAuth, (req, res, next) => {

  var Query = Admin.find({ user_id: req.userData.user_id}).select('payment_details');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'payment details retrived successfully!',
      paymentDetails: result[0].payment_details
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Payment Details Retrival unsuccessfull! Please Try Again!'
    });
  });
});


// get admin payments
admin.get('/get/payment',checkAuth, (req, res, next) => {

  var Query = Admin.findOne().select('payment_details');
  var paymentDetails;
  var merchantPay;

  Query.exec().then((result) => {
    console.log(result);
    paymentDetails = result.payment_details;
    for(let pd of paymentDetails) {
      if (pd.user_id = req.userData.user_id) {
        merchantPay = pd;
      }
    }
    res.status(200).json({
      message: 'payment details retrived successfully!',
      merchantPayment: merchantPay
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Payment Details Retrival unsuccessfull! Please Try Again!'
    });
  });
});

// get admin payments
admin.post('/make/payment',checkAuth, (req, res, next) => {

  var Query = Admin.findOne().select('payment_details');
  var paymentDetails;
  var i=0;
  var merchantIndex = 0;
  var paysIndex = -1;

  Query.exec().then((result) => {
    console.log(result);
    paymentDetails = result.payment_details;
    for(let pd of paymentDetails) {
      if (pd.user_id = req.userData.user_id) {
        merchantIndex = i;
        for (let p of pd.pays) {
          paysIndex++;
        }
      }
      i++;
    }
    console.log(merchantIndex, ' : ', paysIndex);
    // updating payment
    paymentDetails[merchantIndex].pays[paysIndex].paid_amount += req.body.amount;
    paymentDetails[merchantIndex].pays[paysIndex].due_amount -= req.body.amount;
    console.log('final pays :', paymentDetails);
    Admin.updateOne({},{
      'payment_details' : paymentDetails
    }).then ( result2 => {
      console.log(result2);
      res.status(200).json({
        message: 'payment details updated successfully!',
      });
    }) .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Payment Details update unsuccessfull! Please Try Again!'
      });
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Payment Details update unsuccessfull! Please Try Again!'
    });
  });
});



// nodemailer send email function
async function sendMail(mail, callback) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: Login.user,
      pass: Login.pass
    }
  });

  let mailOptions = {
    from: '"Evenza HelpDesk "<support@evenza.biz>', // sender address
    to: mail.email, // list of receivers
    subject: mail.subject, // Subject line
    html: mail.html
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// create custom HTML
function createHTML(mailType,content) {
  if(mailType == 'Booking'){
    const message = "<h3> You have new "+ mailType + " on " + content.admin_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.booking_id
    + "</b></h4><h4>Booked Date : <b> " +
   content.from_date.slice(0,10)
    + " </b></h4><h4>Duration : <b> " + content.duration + ' ' + content.rate_type.slice(1) + "(s) </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  } else if (mailType == 'Appointment'){
    const message = "<h3> You have new "+ mailType + " on " + content.admin_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.appoint_id
    + "</b></h4><h4>Appointed Date : <b> " +
   content.appointed_date.slice(0,10)
    + " </b></h4><h4>Appointed Time : <b> " + content.appointed_time.hour + ':' + content.appointed_time.minute + " Hrs </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  }

  }


module.exports = admin;
