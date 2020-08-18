// imports
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const sellerOrder = express();

//middleware
sellerOrder.use(bodyParser.json());
sellerOrder.use(bodyParser.urlencoded({ extended: false }));

// REST API

//update order state
sellerOrder.post('/edit',checkAuth, (req, res, next) => {

  Order.findOneAndUpdate({ 'order_id': req.body.orderId},{'state':req.body.state}).then( (recievedOrder) => {
    console.log(recievedOrder);
    res.status(200).json(
      {
        message: 'Order state updated successfully!',
        order: recievedOrder
      }
    );
  }).catch( err => {
       console.log(err);
      res.status(500).json(
        { message: 'Error while updating Order State! Please Retry!'}
        );
    });
});


//get list of orders
sellerOrder.get('/get',checkAuth, (req, res, next) => {
  Order.find({'seller.seller_id': req.userData.user_id},function (err, orders) {
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

//get selected order
sellerOrder.get('/get/:id',checkAuth, (req, res, next) => {
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
      { message: 'Error while loading Order Details! Please Retry!'}
      );
  })
});


module.exports = sellerOrder;
