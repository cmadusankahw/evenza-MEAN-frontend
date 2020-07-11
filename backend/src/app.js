const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require ("path");

const app = express();

//import app segments
const auth = require ('./controller/auth/auth');
const product = require ('./controller/product/product');
const service = require ('./controller/service/service');
const eventPlanner = require ('./controller/eventplanner/eventPlanner');
const serviceProvider = require ('./controller/serviceprovider/serviceProvider');
const seller = require ('./controller/seller/seller');
const event = require ('./controller/event/event');

mongoose.connect('mongodb://localhost:27017/evenza',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to monogodb database..');
  })
  .catch(() => {
    console.log('Connection to database failed!');
  });

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb',extended: false }));
app.use("/images",express.static(path.join("src/assets/images/")));

//Allow CROS
app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


//functions here
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/service', service);
app.use('/api/planner', eventPlanner);
app.use('/api/sp', serviceProvider);
app.use('/api/seller', seller);
app.use('/api/event', event);

module.exports = app;
