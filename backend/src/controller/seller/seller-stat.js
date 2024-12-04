// imports
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const sellerStat = express();

//middleware
sellerStat.use(bodyParser.json());
sellerStat.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get dashboard stats
sellerStat.get('/get',checkAuth, (req, res, next) => {

  var orderQuery = Order.find({ 'seller.seller_id': req.userData.user_id}).select(' order_id product_id product quantity qty_type product_category state created_date commission_due amount_paid amount');

  orderQuery.exec().then((resOrders) => {
    console.log(resOrders);
      res.status(200).json(
        {
          message: 'Report Data recieved successfully!',
          orders: resOrders,
        });
  }).catch( err=> {
    console.log(err);
  })
});


module.exports = sellerStat;
