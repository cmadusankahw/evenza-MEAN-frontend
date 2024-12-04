//model imports
const EventCategories = require("../../model/event/categories.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const eventCat = express();

//middleware
eventCat.use(bodyParser.json());
eventCat.use(bodyParser.urlencoded({ extended: false }));


// REST API


//get event categories
eventCat.get('/get', (req, res) => {

  EventCategories.find(function (err, categories) {
    console.log(categories);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'event categories recieved successfully!',
        categories: categories
      }
    );
  });
});

//get event category
eventCat.get('/get/:id', (req, res) => {

  EventCategories.findOne({id: req.params.id }).then ( (category) => {
    console.log(category);
    res.status(200).json(
      {
        message: 'event category recieved successfully!',
        category: category
      }
    );
  }).catch( err=> {
    console.log(err);
  })
});

// create event category
eventCat.post('/add', (req, res) => {

  var category = new EventCategories(req.body);
  category.save().then(  (category)=> {
    console.log(category);
    res.status(200).json(
      {
        message: 'event category added successfully!',
      }
    );
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "event category was not added! Please try again!" });
  })
});

// remove event category
eventCat.post('/remove',checkAuth, (req, res) => {
  EventCategories.deleteOne({'id': req.body.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "event category removed!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "event category was not removed! Please try again!" });
  })
});

module.exports = eventCat;
