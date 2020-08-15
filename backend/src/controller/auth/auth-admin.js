//model imports
const User = require("../../model/auth/user.model");
const Admin = require("../../model/admin/admin.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const authAdmin = express();

//middleware
authAdmin.use(bodyParser.json());
authAdmin.use(bodyParser.urlencoded({ extended: false }));


//REST API

// update admin details
authAdmin.post('/edit',checkAuth, (req, res, next) => {
  Admin.updateOne({ user_id: req.userData.user_id},{
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.body.profile_pic,
    email: req.body.email,
    contact_no: req.body.contact_no,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    postal_code: req.body.postal_code,
    gender: req.body.gender,
    card_details: req.body.card_details
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'admin profile updated successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});


// get event planner logged in
authAdmin.get('/get',checkAuth, (req, res, next) => {

  Admin.findOne({ user_id: req.userData.user_id }, function (err,admin) {
    if (err) return handleError(err => {
      res.status(500).json(
        {
          message: 'Couldn\'t recieve Admin Details! Please check your connetion'
        });
    });
    res.status(200).json(
      {
        message: 'Admin details recieved successfully!',
        admin: admin
      }
    );
  });
});

module.exports = authAdmin;
