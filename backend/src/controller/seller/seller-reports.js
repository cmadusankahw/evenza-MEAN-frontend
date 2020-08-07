const Product = require ("../../model/product/product.model");
const Merchant = require ("../../model/auth/merchant.model");
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const selreport = express();

//middleware
selreport.use(bodyParser.json());
selreport.use(bodyParser.urlencoded({ extended: false }));



//post methods

selreport.post('/order/edit',checkAuth, (req, res, next) => {

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


// get methods

//get list of orders
selreport.get('/order/get',checkAuth, (req, res, next) => {
  Order.find({'selreport.selreport_id': req.userData.user_id},function (err, orders) {
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



// send an  email
selreport.post("/mail", checkAuth, (req,res,next) => {
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


module.exports = selreport;
