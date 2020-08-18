//model imports
const checkAuth = require("../../middleware/auth-check");
const Service = require ("../../model/service/service.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");


//express app declaration
const servicePromotions = express();

//middleware
servicePromotions.use(bodyParser.json());
servicePromotions.use(bodyParser.urlencoded({ extended: false }));

// REST API

// add a promotion to a product
servicePromotions.post('/add',checkAuth, (req, res, next) => {

  Service.findOneAndUpdate({ service_id: req.body.serviceId },{
    $push: {promotions: req.body.promotion}
  }).then( (result) => {
    console.log(result);
    res.status(200).json(
      {
        message: 'Promotion added Successfully!',
      }
    );
  }).catch( (err) => {
    res.status(500).json(
      { message: 'Promotion unsuccessfull! Please try again'}
      );
  });
});


module.exports = servicePromotions;
