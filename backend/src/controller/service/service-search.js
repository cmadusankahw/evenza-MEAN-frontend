//model imports
const Service = require("../../model/service/service.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const serviceSearch = express();

//middleware
serviceSearch.use(bodyParser.json());
serviceSearch.use(bodyParser.urlencoded({ extended: false }));

// REST API

//search services 
serviceSearch.post('/all', (req, res, next) => {
  Service.aggregate([
                // step 1 : matching filters from service model
                {$match: {"service_category": req.body.category,
                "rate": {$lte: req.body.maxPrice, $gte: req.body.minPrice },
                "pay_on_meet":req.body.payOnMeet,
                "rating": {$gte: req.body.userRating},
                "available_booking": true}},
                // step 2 : joining possible bookings from Booking model
                {$lookup: {
                      from : "Booking",
                      localField : "service_id",
                      foreignField : "service_id",
                      as : "bookings"
                  }},
	       {$sort: {"rating": -1} }
              ])
  .then (finalResult => {
      res.status(200).json({
        message: 'services recieved successfully!',
        services: finalResult
      });
    })
    .catch( err =>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while recieving services! Please Retry!'
      });
    });
});

//search services for an event
serviceSearch.post('/event', (req, res, next) => {
  console.log(req.body);
  var  Query = Service.find({"service_category": req.body.category,
                              "rate": {$lte: req.body.maxPrice},
                              "pay_on_meet":req.body.payOnMeet,
                              "rating": {$gte: req.body.userRating},
                              "available_booking": true}).sort({"rating": -1});;

  // create query depend on category
  if ( req.body.category == 'all') {
    Query = Service.find({"rate": {$lte: req.body.maxPrice},
                          "rating": {$gte: req.body.userRating},
                          "available_booking": true}).sort({"rating": -1});;
  }

  Query.exec().then (finalResult => {
    console.log(finalResult);
      res.status(200).json({
        message: 'services recieved successfully!',
        services: finalResult
      });
    })
    .catch( err =>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while recieving services! Please Retry!'
      });
    });
});

module.exports = serviceSearch;
