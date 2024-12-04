//model imports
const Product = require("../../model/product/product.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const productRating = express();

//middleware
productRating.use(bodyParser.json());
productRating.use(bodyParser.urlencoded({ extended: false }));

// add a rating to a product
productRating.post('/add',checkAuth, (req, res, next) => {
  var finalRate = 1/ req.body.rate;
  var nameQuery = EventPlanner.findOne({user_id: req.userData.user_id}).select('first_name last_name');

  nameQuery.exec().then( (result) => {
  Product.findOneAndUpdate({ product_id: req.body.id },{
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
});
});

module.exports = productRating;
