//model imports
const Admin = require("../../model/admin/admin.model");
const User = require("../../model/auth/user.model");
const Merchant = require("../../model/auth/merchant.model");
const Product = require("../../model/product/product.model");
const Service = require("../../model/service/service.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");


//express app declaration
const authMerchant = express();

//middleware
authMerchant.use(bodyParser.json());
authMerchant.use(bodyParser.urlencoded({ extended: false }));

//REST API

// signup merchant
authMerchant.post('/signup', (req, res, next) => {
  const merchant = new Merchant (req.body);
  const tDate = new Date();
  const year = tDate.getFullYear();
  const month = tDate.getMonth() +1 ;
  console.log(merchant);
  merchant.save()
    .then (result => {
      // adding initial subscription
      // PROTOCOL - first Month No Subscription FEE
      Admin.updateOne({},{
        $push : { payment_details: {user_id: result.user_id,
                                    user_type: result.user_type,
                                    first_name: result.first_name,
                                    last_name: result.last_name,
                                    email: result.email,
                                    pays: [{
                                      timestamp: {type: year,
                                      month:month + 1},
                                      paid_date: tDate,
                                      paid_amount: 0,
                                      due_amount: 0,
                                    }]} }
      }).then( fs => {
        console.log(fs);
        res.status(200).json({
          message: 'Merchant added successfully!'
        });
      })

    })
    .catch( err => {
      console.log(err);
      res.status(500).json({
        message: 'Merchant sign up was not successfull! Please try again!'
      });
    });
});


//edit merchant
authMerchant.post('/edit',checkAuth, (req, res, next) => {
  Merchant.updateOne({ user_id: req.userData.user_id}, {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_pic: req.body.profile_pic,
    nic: req.body.nic,
    email: req.body.email,
    contact_no: req.body.contact_no,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    postal_code: req.body.postal_code,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    id_verification: req.body.id_verification,
    business: req.body.business
  })
  .then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'merchant updated successfully!',
    });
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'Profile Details update unsuccessfull! Please Try Again!'
    });
  });
});


// remove a merchant when profile deactivation (remove merchant, their services and products) *********************
authMerchant.delete('/remove:id',checkAuth, (req, res, next) => {

  var removeMerchantQuery =  Merchant.deleteOne({user_id: req.params.id});
  var removeUserQuery =  User.deleteOne({user_id: req.params.id});
  var removeServiceQuery = Service.delete({user_id: req.params.id});
  var removeProductQuery = Product.delete({user_id: req.params.id});

  removeUserQuery.exec().thrn ( () => {
  removeMerchantQuery.exec().then( () => {
    removeServiceQuery.exec().then( () => {
      removeProductQuery.exec().then ( ()=> {
        res.status(200).json(
          {
            message: 'Your Profile has been deactivated!',
          }
        );
      }).catch( (err) => {
        console.log(err);
        res.status(500).json(
          {
            message: 'Couldn\'t deactivate! Please retry!'
          });
      });
    }).catch( (err) => {
      console.log(err);
      res.status(500).json(
        {
          message: 'Couldn\'t deactivate! Please retry!'
        });
    });
  }).catch( (err) => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Couldn\'t deactivate! Please retry!'
      });
  });
  }).catch( (err) => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Couldn\'t deactivate! Please retry!'
      });
  });
});



// get merchant logged in
authMerchant.get('/get',checkAuth, (req, res, next) => {
  console.log(req.userData);
  Merchant.findOne({ user_id: req.userData.user_id}).then( (merchant) => {
    res.status(200).json(
      {
        message: 'Merchant recieved successfully!',
        merchant: merchant
      }
    );
  }).catch( err => {
    res.status(500).json(
      {
        message: 'Couldn\'t recieve Merchant Details! Please check your connetion'
      });
  })
});

// get merchant logged in
authMerchant.get('/get/:id',checkAuth, (req, res, next) => {
  Merchant.findOne({ user_id: req.params.id}).then( (merchant) =>  {

    res.status(200).json(
      {
        message: 'Merchant recieved successfully!',
        merchant: merchant
      }
    );
  }).catch( err => {
    res.status(500).json(
      {
        message: 'Couldn\'t recieve Merchant Details! Please check your connetion'
      });
});
});

// get all moerchants for admin
authMerchant.get('/all',checkAuth, (req, res, next) => {
  var Query =  Merchant.find();

  Query.exec( function (err,merchant) {
    console.log(merchant);
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        {
          message: 'Couldn\'t recieve Merchant Details! Please check your connetion'
        });
    });
    res.status(200).json(
      {
        message: 'Merchants recieved successfully!',
        merchants: merchant
      }
    );
  });
});


module.exports = authMerchant;
