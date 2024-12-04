//model imports
const User = require("../../model/auth/user.model");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require ("bcrypt");

//express app declaration
const authUser = express();

//middleware
authUser.use(bodyParser.json());
authUser.use(bodyParser.urlencoded({ extended: false }));

// express app use


//REST API

// signup user
authUser.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
      const user = new User ({
        user_id: req.body.user_id,
        email: req.body.email,
        user_type: req.body.user_type,
        password: hash,
        state: req.body.state
      });
    console.log(user);
    user.save()
      .then( result => {
        res.status(200).json({
          message: 'user added successfully!',
          result: result
        });
      })
        .catch( err => {
          res.status(500).json({
            message: 'User signup was not successfull! Please try again!'
          });
        });
    });
});


module.exports = authUser;
