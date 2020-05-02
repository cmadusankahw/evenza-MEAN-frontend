//model imports
const Product = require("../../../models/product/product.model");
const ProductCategories = require("../../../models/product/categories.model");
const QuantityTypes = require("../../../models/product/quantities.model");

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


//add new product
product.post('/add', (req, res, next) => {
    const newProduct = new Product(req.body);
    console.log(newProduct);
    newProduct.save( function(err, product) {
        if (err) return console.error(err);
        res.status(200).json({
          message: 'product added successfully!'
        });
      });
});

// add product photos
product.post('/add/img',multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let image01Path, image02Path, image03Path = null;
    if (req.files[0]){
      image01Path = url+ "/images/products/" + req.files[0].filename;
    }
    if (req.files[1]){
      image02Path = url+ "/images/products/" + req.files[1].filename;
    }
    if (req.files[2]){
      image03Path = url+ "/images/products/" + req.files[2].filename;
    }
    res.status(200).json({
      image_01: image01Path,
      image_02: image02Path,
      image_03: image03Path
    });

});

//edit product
product.post('/edit/:id', (req, res, next) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  Product.updateOne({ product_id: req.params.id }, {
    business_name:  req.body.business_name,
    product: req.body.product,
    product_category: req.body.product_category,
    qty_type: req.body.qty_type,
    description: req.body.description,
    created_date: req.body.created_date,
    created_time: req.body.created_time,
    availability: req.body.availability,
    inventory: req.body.inventory,
    rating: req.body.rating,
    no_of_ratings: req.body.no_of_ratings,
    no_of_orders: req.body.no_of_orders,
    delivery_service: req.body.delivery_service,
    price: req.body.price,
    pay_on_delivery: req.body.pay_on_delivery,
    image_01: req.body.image_01,
    image_02: req.body.image_02,
    image_03: req.body.image_03
  },
    function (err) {
    if (err) return console.error(err);
    res.status(200).json({
      message: 'product updated successfully!'
    });
  });
});


//remove a product
product.delete('/edit/:id', (req, res, next) => {
  Product.deleteOne({'product_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Product deleted!" });
    }
  );
});

// get methods

//get selected product
product.get('/get/:id', (req, res, next) => {

  Product.findOne({ product_id: req.params.id }, function (err,product) {
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


//get list of products
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

//get product id of the last product
product.get('/last', (req, res, next) => {
  Product.find(function (err, products) {
    var lastid;
    if(products.length){
      lastid = products[products.length-1].product_id;
    } else {
      lastid= 'P0';
    }
    console.log(lastid);
    if (err) return handleError(err);
    res.status(200).json(
      {
        lastid: lastid
      }
    );
  });
});

module.exports = product;
