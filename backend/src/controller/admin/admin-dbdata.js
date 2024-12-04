//model imports
const Booking = require("../../model/service/booking.model");
const Order = require("../../model/product/order.model");
const Merchant = require("../../model/auth/merchant.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const checkAuth = require("../../middleware/auth-check");



//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

// express app imports


//express app declaration
const adminDbdata = express();

//middleware
adminDbdata.use(bodyParser.json());
adminDbdata.use(bodyParser.urlencoded({ extended: false }));



// get all the user counts for dashboard updating
adminDbdata.get('/get', checkAuth, (req, res, next) => {

  var eventPlannerCount = EventPlanner.countDocuments();

  var userCount = Merchant.aggregate([
    {
      "$facet": {
        "ServiceProvider": [
          { "$match": { "user_type": 'serviceProvider' } },
          { "$count": "ServiceProvider" },
        ],
        "Seller": [
          { "$match": { "user_type": 'seller' } },
          { "$count": "Seller" }
        ],
      }
    },
    {
      "$project": {
        "sellers": { "$arrayElemAt": ["$Seller.Seller", 0] },
        "serviceProviders": { "$arrayElemAt": ["$ServiceProvider.ServiceProvider", 0] },
      }
    }
  ]);

  var bookingCount = Booking.aggregate([
    {
      "$facet": {
        "Pending": [
          { "$match": { "state": 'pending' } },
          { "$count": "Pending" },
        ],
        "Completed": [
          { "$match": { "state": 'completed' } },
          { "$count": "Completed" }
        ],
        "Cancelled": [
          { "$match": { "state": 'cancelled' } },
          { "$count": "Cancelled" }
        ],
      }
    },
    {
      "$project": {
        "pending": { "$arrayElemAt": ["$Pending.Pending", 0] },
        "completed": { "$arrayElemAt": ["$Completed.Completed", 0] },
        "cancelled": { "$arrayElemAt": ["$Cancelled.Cancelled", 0] },
      }
    }
  ]);


  var orderCount = Order.aggregate([
    {
      "$facet": {
        "Pending": [
          { "$match": { "state": 'pending' } },
          { "$count": "Pending" },
        ],
        "Delivered": [
          { "$match": { "state": 'delivered' } },
          { "$count": "Delivered" }
        ],
        "Cancelled": [
          { "$match": { "state": 'cancelled' } },
          { "$count": "Cancelled" }
        ],
      }
    },
    {
      "$project": {
        "pending": { "$arrayElemAt": ["$Pending.Pending", 0] },
        "delivered": { "$arrayElemAt": ["$Delivered.Delivered", 0] },
        "cancelled": { "$arrayElemAt": ["$Cancelled.Cancelled", 0] },
      }
    }
  ]);



  var dashboardData = {
    bookings: {},
    orders: {},
    users: {}
  }

  userCount.exec().then((resUsers) => {
    dashboardData.users = resUsers;
    orderCount.exec().then((resOrders) => {
      dashboardData.orders = resOrders;
      bookingCount.exec().then((resBookings) => {
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
  }).catch((err) => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Something went wrong while recieving Dashboard Details!'
      });
  });
});



module.exports = adminDbdata;
