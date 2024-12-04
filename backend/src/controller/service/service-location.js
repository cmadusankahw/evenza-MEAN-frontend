//model imports
const Merchant = require("../../model/auth/merchant.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const serviceLocation = express();

//middleware
serviceLocation.use(bodyParser.json());
serviceLocation.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get business locations
serviceLocation.get('/get', (req, res, next) => {

  var query =  Merchant.find({business:{$ne : null}}).select(['business.location', 'business.title']);

  query.exec(function (err, locations) {
    console.log(locations);
    if (err) return handleError(err => {
      console.llog(err);
      res.status(500).json(
        { message: 'No locations Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'locaion list recieved successfully!',
        locations: locations
      }
    );
  });
});

module.exports = serviceLocation;
