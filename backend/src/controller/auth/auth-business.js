//model imports
const Merchant = require("../../model/auth/merchant.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const authBusiness = express();

//middleware
authBusiness.use(bodyParser.json());
authBusiness.use(bodyParser.urlencoded({ extended: false }));


//REST API

// update mrchant business profile
authBusiness.post('/edit',checkAuth, (req, res, next) => {
const newBusiness = req.body;
console.log(newBusiness);
Merchant.updateOne({ user_id: req.userData.user_id}, {
  business: newBusiness
})
.then(result=>{
  res.status(200).json({
    message: 'Business Profile updated successfully!',
    result: result
  });
})
.catch(err=>{
  console.log(err);
  res.status(500).json({
    message: 'Business profile update was unsuccessful! Please try Again!'
  });
});
});


module.exports = authBusiness;
