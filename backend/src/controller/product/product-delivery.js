//model imports
const DeliveryService = require("../../model/product/deliveryService.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const productDelivery = express();

//middleware
productDelivery.use(bodyParser.json());
productDelivery.use(bodyParser.urlencoded({ extended: false }));

// REST API

//remove a product category
productDelivery.delete('/remove/:id',checkAuth, (req, res, next) => {
  DeliveryService.deleteOne({'delivery_service': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Delivery Service removed!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Error while removing Delivery Service!" });
  })
});


//get delivery services
productDelivery.get('/get', (req, res, next) => {

  DeliveryService.find().then ( (deliveryServices) => {
    console.log(deliveryServices);
    res.status(200).json(
      {
        message: 'Delivery Services recieved successfully!',
        deliveryServices: deliveryServices
      }
    );
  }).catch( err => {
    console.log(err);
  })
});

//get delivery services
productDelivery.post('/add', (req, res, next) => {
  const deliverService = new DeliveryService(req.body);
  deliverService.save().then(deliveryServices => {
    console.log(deliveryServices);
    res.status(200).json(
      {
        message: 'Delivery Services added successfully!',
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Operation was unsuccessfull!',
      }
    );
  });
});

//get delivery services
productDelivery.post('/edit', (req, res, next) => {

  DeliveryService.updateOne({'delivery_service': req.body.delivery_service},{
    title: req.body.title,
    address: req.body.address,
    hotline: req.body.hotline,
    delivery_rate: req.body.delivery_rate,
    min_delivery_time: req.body.min_delivery_time,
    max_delivery_time: req.body.max_delivery_time,
  }).then(result => {
    console.log(result);
    res.status(200).json(
      {
        message: 'Delivery Services updated successfully!',
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Operation was unsuccessfull!',
      }
    );
  });
});


module.exports = productDelivery;
