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

  DeliveryService.find(function (err, deliveryServices) {
    console.log(deliveryServices);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Delivery Services recieved successfully!',
        deliveryServices: deliveryServices
      }
    );
  });
});

//get delivery services
productDelivery.post('/add', (req, res, next) => {
  const deliverService = new DeliveryService(req.body);
  deliverService.save90.then(deliveryServices => {
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


module.exports = productDelivery;
