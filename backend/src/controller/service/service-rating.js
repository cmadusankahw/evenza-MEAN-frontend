//model imports
const Service = require("../../model/service/service.model");
const EventPlanner = require ("../../model/auth/eventPlanner.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const serviceRating = express();

//middleware
serviceRating.use(bodyParser.json());
serviceRating.use(bodyParser.urlencoded({ extended: false }));

// REST API

// add a rating to a service
serviceRating.post('/add',checkAuth, (req, res, next) => {
  var finalRate = 1/ req.body.rate;
  var nameQuery = EventPlanner.findOne({user_id: req.userData.user_id}).select('first_name last_name');

  nameQuery.exec().then( (result) => {
    Service.findOneAndUpdate({ service_id: req.body.id },{
      $push: {reviews: {
        user: result.first_name + ' ' + result.last_name,
        rating: req.body.rate,
        review: req.body.review,
      }},
      $inc: {rating: finalRate }
    }).then( (result) => {
      console.log(result);
      res.status(200).json(
        {
          message: 'Rating was Successfull! thanks for contributing!',
        }
      );
  }).catch( (err) => {
    res.status(500).json(
      { message: 'Rating unsuccessfull! Please try again'}
      );
  });
  }).catch( (err) => {
    res.status(500).json(
      { message: 'Rating unsuccessfull! Please try again'}
      );
  })
});

module.exports = serviceRating;
