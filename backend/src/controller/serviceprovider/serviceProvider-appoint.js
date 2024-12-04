// imports
const Appointment = require("../../model/service/appointment.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const spAppoint = express();

//middleware
spAppoint.use(bodyParser.json());
spAppoint.use(bodyParser.urlencoded({ extended: false }));

// REST API

//get list of appointments
spAppoint.get('/get', checkAuth, (req, res, next) => {
  Appointment.find({ 'serviceProvider.serviceProvider_id': req.userData.user_id }).then( (appointments) => {
    console.log(appointments);
    res.status(200).json(
      {
        message: 'appoitment list recieved successfully!',
        appointments: appointments
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No Appointments Found!' }
    );
  })
});

//get selected appointment
spAppoint.get('/get/:id', checkAuth, (req, res, next) => {

  Appointment.findOne({ 'appoint_id': req.params.id }).then( (recievedAppoint) => {
    console.log(recievedAppoint);
    res.status(200).json(
      {
        message: 'Appointment recieved successfully!',
        appointment: recievedAppoint
      }
    );
  }).catch ( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while loading Appointment Details! Please Retry!' }
    );
  })
});

//update appointment state
spAppoint.post('/edit', checkAuth, (req, res, next) => {

  Appointment.findOneAndUpdate({ 'appoint_id': req.body.appointId }, { 'state': req.body.state }).then ( (recievedAppoint) => {
    console.log(recievedAppoint);
    res.status(200).json(
      {
        message: 'Appointment state updated successfully!',
        appointment: recievedAppoint
      }
    );
  }).catch ( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while updating Appointment State! Please Retry!' }
    );
  })
});

module.exports = spAppoint;
