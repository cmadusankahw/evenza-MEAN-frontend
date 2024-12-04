//model imports
const checkAuth = require("../../middleware/auth-check");
const Inquery = require("../../model/eventplanner/inquery.model");


//dependency imports
const express = require("express");
const bodyParser = require("body-parser");


//express app declaration
const eventPlannerInquery = express();

//middleware
eventPlannerInquery.use(bodyParser.json());
eventPlannerInquery.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get list of inqueries
eventPlannerInquery.get('/get', (req, res, next) => {
  Inquery.find().then( (inquries) => {
    console.log(inquries);
    res.status(200).json(
      {
        message: 'inquery list recieved successfully!',
        inqueries: inquries
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Inquries Found!'}
      );
  });
});


//get a selecte inquery
eventPlannerInquery.get('/get/:id',checkAuth, (req, res, next) => {
  Inquery.findOne({id: req.params.id}).then( (inquries) => {
    console.log(inquries);
    res.status(200).json(
      {
        message: 'inquery recieved successfully!',
        inquery: inquries
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Inquries Found!'}
      );
  });
});


//get list of orders
eventPlannerInquery.post('/add',checkAuth, (req, res, next) => {
  var inqRes = req.body;
  inqRes['user_id'] = req.userData.user_id;

  const newInq = new Inquery(inqRes);

  newInq.save().then(
    (inquries) => {
      console.log(inquries);
      res.status(200).json(
        {
          message: 'inquery created successfully!',
        }
      ).catch( err => {
        console.log(err);
    res.status(500).json(
      { message: 'Inquery Creation unsuccessfull!'}
      );
  });
});
});

//get a selecte inquery
eventPlannerInquery.delete('/remove/:id',checkAuth, (req, res, next) => {
  Inquery.deleteOne({id: req.params.id}).then( (inquries) => {
    console.log(inquries);
    res.status(200).json(
      {
        message: 'inquery removed successfully!',
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Inquries removed!'}
      );
  });
});


module.exports = eventPlannerInquery;
