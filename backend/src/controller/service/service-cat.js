//model imports
const ServiceCategories = require("../../model/service/categories.model");
const checkAuth = require("../../middleware/auth-check");


//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const serviceCat = express();

//middleware
serviceCat.use(bodyParser.json());
serviceCat.use(bodyParser.urlencoded({ extended: false }));

// REST API

//add service category
serviceCat.post('/add',checkAuth, (req, res, next) => {
  console.log(req.body);
  var cat = req.body;
  var newCategory = new ServiceCategories(cat);
  newCategory.save()
  .then(result => {
      res.status(200).json({
        message: 'service category added!',
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error while adding service category!'
      });
    });
});


//remove a service category
serviceCat.post('/remove',checkAuth, (req, res, next) => {
  ServiceCategories.deleteOne({'val': req.body.cat}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Service Category deleted!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Error while removing Service Category!" });
  })
});


//get product categories
serviceCat.get('/get', (req, res, next) => {

  ServiceCategories.find().then ( (categories) => {
    console.log(categories);
    res.status(200).json(
      {
        message: 'Product categories recieved successfully!',
        categories: categories
      }
    );
  }).then( err => {
    console.log(err);
  })
});


module.exports = serviceCat;
