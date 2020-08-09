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

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron"); // running scheduled tasks

//express app declaration
const areport = express();


//middleware
areport.use(bodyParser.json());
areport.use(bodyParser.urlencoded({ extended: false }));


// test

areport.get('/get', (req, res, next) => {
  res.status(200).json(
    {
      message: 'module works!',
    }
  );
});


// running scheduled payment updates

// variables

var i=0;

// schedule tasks to be run on the server - update payments
cron.schedule("* * 28 * *", function() {

  areport.findOne().select('payment_details').then( result => {
    var paymentDetails = result.payment_details;
    var merchantIndex = 0;
    var paysIndex = 0;
    var dueAmt = 299;
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
          paid_date: 'Not Payed',
          timestamp: {
            year: timeStamp.year,
            month: timeStamp.month +1,
          }
        }
        merchantIndex++;
    }
    console.log(paymentDetails);
    areport.updateOne({},{
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

// get merchant logged in
areport.get('/get/dbdata',checkAuth, (req, res, next) => {

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





// create custom HTML
function createHTML(mailType,content) {
  if(mailType == 'Booking'){
    const message = "<h3> You have new "+ mailType + " on " + content.areport_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.booking_id
    + "</b></h4><h4>Booked Date : <b> " +
   content.from_date.slice(0,10)
    + " </b></h4><h4>Duration : <b> " + content.duration + ' ' + content.rate_type.slice(1) + "(s) </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  } else if (mailType == 'Appointment'){
    const message = "<h3> You have new "+ mailType + " on " + content.areport_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.appoint_id
    + "</b></h4><h4>Appointed Date : <b> " +
   content.appointed_date.slice(0,10)
    + " </b></h4><h4>Appointed Time : <b> " + content.appointed_time.hour + ':' + content.appointed_time.minute + " Hrs </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  }

  }


module.exports = areport;
