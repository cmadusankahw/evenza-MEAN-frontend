//model imports
const ProductCategories = require("../../model/product/categories.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const productCat = express();

//middleware
productCat.use(bodyParser.json());
productCat.use(bodyParser.urlencoded({ extended: false }));

//REST API

//add product category
productCat.post('/add',checkAuth, (req, res, next) => {
  var cat = req.body;
  var newCategory = new ProductCategories(cat);
  newCategory.save()
  .then(result => {
      res.status(200).json({
        message: 'products category added!',
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error while adding product category!'
      });
    });
});

//remove a product category
productCat.post('/remove',checkAuth, (req, res, next) => {
  ProductCategories.deleteOne({'val': req.body.cat}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Product Category deleted!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Error while removing Product Category!" });
  })
});

//get product categories
productCat.get('/get', (req, res, next) => {

  ProductCategories.find().then ( (categories) => {
    console.log(categories);
    res.status(200).json(
      {
        message: 'Product categories recieved successfully!',
        categories: categories
      }
    );
  }).catch ( err => {
    console.log(err);
  })
});

module.exports = productCat;
