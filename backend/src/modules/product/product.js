//model imports
const Product = require("../../../models/product/product.model");
const ProductCategories = require("../../../models/product/categories.model");
const QuantityTypes = require("../../../models/product/quantities.model");
const PaymentTypes = require("../../../models/paymentTypes.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require ("multer");

//express app declaration
const product = express();


// multer setup for image upload
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
  'image/gif' : 'gif'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid Image");
    if(isValid){
      error=null;
    }
    cb(error,"src/assets/images/products");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
product.use(bodyParser.json());
product.use(bodyParser.urlencoded({ extended: false }));


//functions here

//add new product
product.post('/get', (req, res, next) => {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    newProduct.save( function(err, product) {
        if (err) return console.error(err);
        res.status(200).json({
          message: 'product added successfully!'
        });
      });
});

//edit product
product.put('/get/:id', (req, res, next) => {
  const product = req.body;
  console.log(product);

  res.status(200).json({
    message: 'product updated successfully!',
  });
});


//remove a product
product.delete('/get/:id', (req, res, next) => {

  const productId = req.param['id'];
  console.log(prductId);
  //remove product in products array code here

  res.status(200).json(
    {
      message: 'products deleted successfully!',
    }
  );
});

// get methods

//get selected product
product.get('/get/:id', (req, res, next) => {

  Product.findOne({ product_id: req.params.id }, function (err, product) {
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'product recieved successfully!',
        product: product
      }
    );
  });
});

//get product categories
product.get('/cat', (req, res, next) => {

  ProductCategories.find(function (err, categories) {
    console.log(categories);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Product categories recieved successfully!',
        categories: categories
      }
    );
  });
});

//get quantity types
product.get('/qt', (req, res, next) => {

  QuantityTypes.find(function (err, quantities) {
    console.log(quantities);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Quantity types recieved successfully!',
        quantities: quantities
      }
    );
  });
});

//get payment types
product.get('/pt', (req, res, next) => {

  PaymentTypes.find(function (err, paymentTypes) {
    console.log(paymentTypes);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Payment types recieved successfully!',
        paymentTypes: paymentTypes
      }
    );
  });
});


//get list of product cards
product.get('/get', (req, res, next) => {
  Product.find(function (err, products) {
    console.log(products);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        products: products
      }
    );
  });
});

module.exports = product;
