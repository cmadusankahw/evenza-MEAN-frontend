const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require ("path");

const app = express();

//import app segments
const auth = require ('./modules/auth/auth');
const product = require ('./modules/product/product');
const service = require ('./modules/service/service');

mongoose.connect('mongodb://localhost:27017/evenza',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to monogodb database..');
  })
  .catch(() => {
    console.log('Connection to database failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images",express.static(path.join("src/assets/images/")));

//Allow CROS
app.use( (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


//functions here
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/service', service);

module.exports = app;
