const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();
const expressOasGenerator = require('express-oas-generator');

// creting an exporess app
const app = express();
expressOasGenerator.init(app, {});

//import app segments
const auth = require('./controller/auth/auth');
const product = require('./controller/product/product');
const service = require('./controller/service/service');
const eventPlanner = require('./controller/eventplanner/eventPlanner');
const serviceProvider = require('./controller/serviceprovider/serviceProvider');
const seller = require('./controller/seller/seller');
const event = require('./controller/event/event');
const admin = require('./controller/admin/admin');

// create database connection
mongoose.connect('mongodb+srv://admin:abcd1234@cluster0.xnfvc.gcp.mongodb.net/evenza?retryWrites=true&w=majority', // mongodb+srv://:${process.env.DB_PASS}@cluster0.xnfvc.gcp.mongodb.net/evenza?retryWrites=true&w=majority    mongodb://localhost:27017/evenza
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to monogodb database..');
  })
  .catch(() => {
    console.log('Connection to database failed!');
  });

// use middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use("/images", express.static(path.join("src/assets/images/")));

//Allow CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


//modules routing
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/service', service);
app.use('/api/planner', eventPlanner);
app.use('/api/sp', serviceProvider);
app.use('/api/seller', seller);
app.use('/api/event', event);
app.use('/api/admin', admin);

// exporting app module
module.exports = app;
