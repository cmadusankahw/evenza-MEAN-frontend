//model imports
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");


//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventPlannerOrder = express();


//middleware
eventPlannerOrder.use(bodyParser.json());
eventPlannerOrder.use(bodyParser.urlencoded({ extended: false }));

// REST API

// submit a review for order
eventPlannerOrder.post('/review/:id', checkAuth, (req, res, next) => {
  Order.findOneAndUpdate({ 'order_id': req.params.id }, { 'review': req.body.msg }).then((order) => {
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
      { message: 'Order not Found! Review was not added!' }
    );
  })
});

//get list of orders
eventPlannerOrder.get('/get', checkAuth, (req, res, next) => {
  Order.find({ 'user.user_id': req.userData.user_id }).then( (orders) => {
    console.log(orders);
    res.status(200).json(
      {
        message: 'orders list recieved successfully!',
        orders: orders
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Orders Found!' }
    );
  })
});

//get selected order
eventPlannerOrder.get('/get/:id', checkAuth, (req, res, next) => {
  Order.findOne({ 'order_id': req.params.id }).then( (recievedOrder) => {
    console.log(recievedOrder);
    res.status(200).json(
      {
        message: 'Order recieved successfully!',
        order: recievedOrder
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while loading Order Details! Please Retry!' }
    );
  })
});


module.exports = eventPlannerOrder;
