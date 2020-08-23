//model imports
const Admin = require("../../model/admin/admin.model");
const checkAuth = require("../../middleware/auth-check");



//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const adminPayment = express();

//middleware
adminPayment.use(bodyParser.json());
adminPayment.use(bodyParser.urlencoded({ extended: false }));


// update admin payment details
// auto update once id paid, or -> paid_amount
// auto update on month end -> due amount
adminPayment.post('/update', checkAuth, (req, res, next) => {
  Admin.updateOne({ user_id: req.userData.user_id }, {
    // update data
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'admin profile updated successfully!',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Profile Details update unsuccessfull! Please Try Again!'
      });
    });
});

// update subscription fee amount
adminPayment.post('/fee/update', checkAuth, (req, res, next) => {
  Admin.updateOne({ user_id: req.userData.user_id }, {
   subscription_fee: req.body.fee
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Fee details updated successfully!',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Fee details update unsuccessfull! Please Try Again!'
      });
    });
});



// get all payments details
adminPayment.get('/get', checkAuth, (req, res, next) => {

  var Query = Admin.find({ user_id: req.userData.user_id }).select('payment_details');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'payment details retrived successfully!',
      paymentDetails: result[0].payment_details
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details Retrival unsuccessfull! Please Try Again!'
      });
    });
});


// get subscription fee to edit by admin
adminPayment.get('/fee/get', checkAuth, (req, res, next) => {

  var Query = Admin.findOne({ user_id: req.userData.user_id }).select('subscription_fee');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'Fee details retrived successfully!',
      fee: result.subscription_fee
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Fee Details Retrival unsuccessfull! Please Try Again!'
      });
    });
});


// get payment details of a single user
adminPayment.get('/get/user', checkAuth, (req, res, next) => {

  var Query = Admin.findOne().select('payment_details');
  var paymentDetails;
  var merchantPay;

  Query.exec().then((result) => {
    console.log(result);
    paymentDetails = result.payment_details;
    for (let pd of paymentDetails) {
      if (pd.user_id == req.userData.user_id) {
        merchantPay = pd;
      }
    }
    res.status(200).json({
      message: 'payment details retrived successfully!',
      merchantPayment: merchantPay
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details Retrival unsuccessfull! Please Try Again!'
      });
    });
});

// update payment details once paid
adminPayment.post('/add', checkAuth, (req, res, next) => {

  var Query = Admin.findOne().select('payment_details');
  var paymentDetails;
  var i = 0;
  var merchantIndex = 0;
  var paysIndex = 0;

  Query.exec().then((result) => {
    console.log(result);
    paymentDetails = result.payment_details;
    for (let pd of paymentDetails) {
      if (pd.user_id == req.userData.user_id) {
        merchantIndex = i;
        paysIndex= -1;
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
    Admin.updateOne({}, {
      'payment_details': paymentDetails
    }).then(result2 => {
      console.log(result2);
      res.status(200).json({
        message: 'payment details updated successfully!',
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details update unsuccessfull! Please Try Again!'
      });
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details update unsuccessfull! Please Try Again!'
      });
    });
});

module.exports = adminPayment;
