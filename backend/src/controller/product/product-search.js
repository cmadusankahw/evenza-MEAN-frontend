//model imports
const Product = require("../../model/product/product.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const productSearch = express();

//middleware
productSearch.use(bodyParser.json());
productSearch.use(bodyParser.urlencoded({ extended: false }));

// REST API

//search products for general results
productSearch.post('/all', (req, res, next) => {

  var Query =  Product.find({ product_category: req.body.category,
                              price: {$lte: req.body.maxPrice},
                              pay_on_delivery:req.body.payOnDelivery,
                              rating: {$gte: req.body.userRating},
                              'availability': true,
                              'inventory': {$gte: 1}});

  if ( req.body.category == ' all') {
      Query =  Product.find({
               price: {$lte: req.body.maxPrice},
               rating: {$gte: req.body.userRating},
               'availability': true,
               'inventory': {$gte: 1}});
  }

  Query.exec().then(result => {
      res.status(200).json({
        message: 'products recieved successfully!',
        products: result
      });
    })
    .catch(err=>{
      res.status(500).json({
        message: 'No matching products Found!'
      });
    });
});

module.exports = productSearch;
