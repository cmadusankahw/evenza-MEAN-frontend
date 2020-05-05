//model imports
const Service = require("../../../models/service/service.model");
const ServiceCategories = require("../../../models/service/categories.model");
const ServiceRates = require("../../../models/service/rates.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require ("multer");

//express app declaration
const service = express();


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
    cb(error,"src/assets/images/services");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));


//add new service
service.post('/add', (req, res, next) => {
    const newService = new Service(req.body);
    console.log(newService);
    newService.save()
    .then(result => {
        res.status(200).json({
          message: 'service added successfully!',
          ressult: result
        });
      })
      .catch(err=>{
        res.status(500).json({
          error: err
        });
      });
});

// add service photos
service.post('/add/img',multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let image01Path, image02Path, image03Path = null;
    if (req.files[0]){
      image01Path = url+ "/images/services/" + req.files[0].filename;
    }
    if (req.files[1]){
      image02Path = url+ "/images/services/" + req.files[1].filename;
    }
    if (req.files[2]){
      image03Path = url+ "/images/services/" + req.files[2].filename;
    }
    res.status(200).json({
      image_01: image01Path,
      image_02: image02Path,
      image_03: image03Path
    });

});

//edit service
service.post('/edit/:id', (req, res, next) => {
  const newService = new Service(req.body);
  console.log(newService);
  Service.updateOne({ service_id: req.params.id }, {
    service_name: req.body.service_name,
    business_name:  req.body.business_name,
    description: req.body.description,
    service_category: req.body.product_category,
    available_booking: req.body.available_booking,
    available_appoints: req.body.available_appoints,
    rating: req.body.rating,
    no_of_ratings: req.body.no_of_ratings,
    no_of_bookings: req.body.no_of_bookings,
    no_of_appoints: req.body.no_of_appoints,
    created_date: req.body.created_date,
    created_time: req.body.created_time,
    rate: req.body.rate,
    rate_type: req.body.rate_type,
    pay_on_meet: req.body.pay_on_meet,
    image_01: req.body.image_01,
    image_02: req.body.image_02,
    image_03: req.body.image_03
  })
  .then(result=>{
    res.status(200).json({
      message: 'service updated successfully!',
      result: result
    });
  })
  .catch(err=>{
    res.status(500).json({
      error: err
    });
  });
});


//remove a service
service.delete('/edit/:id', (req, res, next) => {
  Service.deleteOne({'service_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Service  deleted!" });
    }
  );
});

// get methods

//get selected service
service.get('/get/:id', (req, res, next) => {

  Service.findOne({ service_id: req.params.id }, function (err,service) {
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Service recieved successfully!',
        service: service
      }
    );
  });
});

//get product categories
service.get('/cat', (req, res, next) => {

  ServiceCategories.find(function (err, categories) {
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

//get service rates
service.get('/rt', (req, res, next) => {

  ServiceRates.find(function (err, rates) {
    console.log(rates);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Quantity types recieved successfully!',
        rates: rates
      }
    );
  });
});


//get list of services
service.get('/get', (req, res, next) => {
  Service.find(function (err, services) {
    console.log(services);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        services: services
      }
    );
  });
});

//get product id of the last product
service.get('/last', (req, res, next) => {
  Service.find(function (err, services) {
    var lastid;
    if(services.length){
      lastid = services[services.length-1].service_id;
    } else {
      lastid= 'S0';
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

module.exports = service;
