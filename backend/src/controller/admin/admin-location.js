//model imports
const Merchant = require("../../model/auth/merchant.model");
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const adminLocation = express();

//middleware
adminLocation.use(bodyParser.json());
adminLocation.use(bodyParser.urlencoded({ extended: false }));

// get service locations
adminLocation.get('/get/m', checkAuth, (req, res, next) => {

  var Query = Merchant.find({'business.location' : {$exists: true }}).select('business.location business.title');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      locations: result
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Location details unsuccessfull! Please Try Again!'
      });
    });
});

// get event locations
adminLocation.get('/get/e', checkAuth, (req, res, next) => {

  var Query = Event.find({location: {$exists: true} }).select('location event_title');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      locations: result
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Location details unsuccessfull! Please Try Again!'
      });
    });
});

module.exports = adminLocation;
