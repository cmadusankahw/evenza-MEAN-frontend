// imports
const Product = require ("../../model/product/product.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const sellerProduct = express();

//middleware
sellerProduct.use(bodyParser.json());
sellerProduct.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get list of products
sellerProduct.get('/get',checkAuth, (req, res, next) => {
  Product.find({'user_id': req.userData.user_id}).then ( (prods) => {
    console.log(prods);
    res.status(200).json(
      {
        message: 'product list recieved successfully!',
        products: prods
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Products Found!'}
      );
  })
});

module.exports = sellerProduct;
