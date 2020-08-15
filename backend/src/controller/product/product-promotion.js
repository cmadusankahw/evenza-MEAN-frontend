//model imports
const Product = require("../../model/product/product.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const productPromotion = express();

//middleware
productPromotion.use(bodyParser.json());
productPromotion.use(bodyParser.urlencoded({ extended: false }));


// add a promotion to a product
productPromotion.post('/add',checkAuth, (req, res, next) => {

  Product.findOneAndUpdate({ product_id: req.body.productId },{
    $push: {promotions: req.body.promotion}
  }).then( (result) => {
    console.log(result);
    res.status(200).json(
      {
        message: 'Promotion added Successfully!',
      }
    );
  }).catch( (err) => {
    res.status(500).json(
      { message: 'Promotion unsuccessfull! Please try again'}
      );
  });
});


module.exports = productPromotion;
