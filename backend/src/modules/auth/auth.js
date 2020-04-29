//model imports
//const authModel = require("../../../models/auth.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const auth = express();

//middleware
auth.use(bodyParser.json());
auth.use(bodyParser.urlencoded({ extended: false }));


//functions here

//login check
auth.post('/login', (req, res, next) => {
    const login = req.body;
    console.log(login);

    //check login details with user collection code


    //send response with success
    res.status(200).json({
      message: 'login details checked with database!',
      loginpassed: true
    });
});


//get list of users
auth.get('/users', (req, res, next) => {
  const user = [
    {
      id: '43cxcxc',
      name: 'test-user'
    }
  ];
  res.status(200).json(
    {
      message: 'user data sent successfully!',
      users: user
    }
  );
});


module.exports = auth;
