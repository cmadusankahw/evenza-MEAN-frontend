//model imports
const Merchant = require("../../model/auth/merchant.model");
const checkAuth = require("../../middleware/auth-check");
const IDVerification = require("../../model/auth/idVerification.model");
const BusinessVerification = require("../../model/auth/businessVerification.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const authVerify = express();

//middleware
authVerify.use(bodyParser.json());
authVerify.use(bodyParser.urlencoded({ extended: false }));


//REST API

// id verify details
authVerify.post('/add/id',checkAuth, (req, res, next) => {
  const v = {
    user_id: req.userData.user_id,
    isverified: req.body.isverified,
    id_sideA: req.body.id_sideA,
    id_sideB: req.body.id_sideB,
    issuer: req.body.issuer
  };
  var verify = new IDVerification (v);
  verify.save()
  .then(result => {
    res.status(200).json({
      message: 'ID verification details submitted for review!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'You have already Verified! Please wait for the review!!'
    });
  });
});


// business verify details
authVerify.post('/add/br',checkAuth, (req, res, next) => {
  const b = {
    user_id: req.userData.user_id,
    business_isverified: req.body.business_isverified,
    br_side_a: req.body.br_side_a,
    br_side_b:  req.body.br_side_b
  };
  var verify2 = new BusinessVerification (b);
  verify2.save()
  .then(result => {
    res.status(200).json({
      message: 'Business verification details submitted for review!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'You have already Verified! Please wait for the review!!'
    });
  });
});


// get verifications

authVerify.get('/get/id',checkAuth, (req, res, next) => {
  IDVerification.find()
  .then((result) => {
    res.status(200).json(
      {
        message: "ID verifications recieved successfully!",
        verifications: result
      });
  }).catch(err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Couldn\'t recieve ID Verification detils'
      });
  });
});

authVerify.get('/get/br',checkAuth, (req, res, next) => {
  BusinessVerification.find()
  .then((result) => {
    res.status(200).json(
      {
        message: "Business verifications recieved successfully!",
        verifications: result
      });
  }).catch(err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Couldn\'t recieve Business Verification detils'
      });
  });
});

// updating verifications

authVerify.post('/update/id',checkAuth, (req, res, next) => {
  const newId = {
    isverified: req.body.isverified,
    id_sideA: req.body.id_sideA,
    id_sideB: req.body.id_sideB,
    isuuer: req.body.issuer
  };
  Merchant.updateOne({ user_id: req.body.user_id}, {
    id_verification: newId
  })
  .then(result=>{
    IDVerification.deleteOne({user_id: req.body.user_id})
    .then( () => {
      res.status(200).json({
        message: 'ID verification updated successfully!',
      });
    }) .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'ID verification update was unsuccessful! Please try Again!'
      });
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'ID verification update was unsuccessful! Please try Again!'
    });
  });
  });


  authVerify.post('/update/br',checkAuth, (req, res, next) => {
  const newB = {
    business_isverified: req.body.business_isverified,
    br_side_a: req.body.br_side_a,
    br_side_b: req.body.br_side_b
  };
  Merchant.updateOne({ user_id: req.body.user_id}, {
    "business.business_verification": newB
  })
  .then(() => {
    BusinessVerification.deleteOne({user_id: req.body.user_id}).
    then( () => {
      res.status(200).json({
        message: 'Business  verification updated successfully!',
      });
    }).catch( err => {
      console.log(err);
      res.status(500).json({
        message: 'Business verification update was unsuccessful! Please try Again!'
      });
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Business verification update was unsuccessful! Please try Again!'
    });
  });
  });


module.exports = authVerify;
