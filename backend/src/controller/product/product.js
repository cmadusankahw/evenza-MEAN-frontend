//model imports
const Product = require("../../model/product/product.model");
const checkAuth = require("../../middleware/auth-check");

// express app imports
const productDelivery = require("./product-delivery");
const productRating = require("./product-rating");
const productOrder = require("./product-order");
const productPromotion = require("./product-promotion");
const productCat = require("./product-cat");
const productSearch = require("./product-search");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");

//express app declaration
const product = express();


// multer setup for image upload
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg',
  'image/gif' : 'gif'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error= new Error("Invalid Image");
    if(isValid){
      error=null;
    }
    cb(error,"src/assets/images/products");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
product.use(bodyParser.json());
product.use(bodyParser.urlencoded({ extended: false }));

// express app includs
product.use('/delivery' , productDelivery);
product.use('/order' , productOrder);
product.use('/cat' , productCat);
product.use('/rating' , productRating);
product.use('/promotion' , productPromotion);
product.use('/search' , productSearch);

// REST API

//add new product
product.post('/add',checkAuth, (req, res, next) => {
  var lastid;
  Product.find(function (err, products) {
    if(products.length){
      lastid = products[products.length-1].product_id;
    } else {
      lastid= 'P0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'P' + mId.toString();
    console.log(lastid);
    if (err) return handleError(err => {
      res.status(500).json({
        message: 'Error occured while getting product ID details!'
      });
    });
  }).then( () => {
    const reqProduct = req.body;
    reqProduct['product_id']= lastid;
    reqProduct['user_id']= req.userData.user_id;
    const newProduct = new Product(reqProduct);
    console.log(newProduct);
    newProduct.save()
    .then(result => {
        res.status(200).json({
          message: 'product added successfully!',
          result: result
        });
      })
      .catch(err=>{
        res.status(500).json({
          message: 'Product creation was unsuccessful! Please try again!'
        });
      });
  });
 });

// add product photos
product.post('/img/add',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let imagePaths = [];
    for (let f of req.files){
      imagePaths.push(url+ "/images/products/" + f.filename);
    }
    res.status(200).json({
      imagePaths: imagePaths
    });

});

//edit product
product.post('/edit',checkAuth, (req, res, next) => {
  const newProduct = new Product(req.body);
  console.log(newProduct);
  Product.updateOne({ product_id: req.body.product_id}, {
    business_name:  req.body.business_name,
    product: req.body.product,
    product_category: req.body.product_category,
    qty_type: req.body.qty_type,
    description: req.body.description,
    created_date: req.body.created_date,
    created_time: req.body.created_time,
    availability: req.body.availability,
    inventory: req.body.inventory,
    rating: req.body.rating,
    no_of_ratings: req.body.no_of_ratings,
    no_of_orders: req.body.no_of_orders,
    delivery_service: req.body.delivery_service,
    price: req.body.price,
    pay_on_delivery: req.body.pay_on_delivery,
    image_01: req.body.image_01,
    image_02: req.body.image_02,
    image_03: req.body.image_03,
    user_id: req.userData.user_id
  })
  .then(result => {
    res.status(200).json({
      message: 'product updated successfully!',
      result: result
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Product update was unsuccessful! Please Try again!'
    });
  });
});


//remove a product
product.delete('/remove/:id',checkAuth, (req, res, next) => {
  Product.deleteOne({'product_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Product deleted!" });
    }
  ).catch((err) => {
    res.status(500).json({ message: "Product was not deleted! Please try again!" });
  })
});


//get list of products for search
product.get('/get', (req, res, next) => {
  Product.find({'availability': true,
                'inventory': {$gte: 1}}).then ( (products) => {
    console.log(products);
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        products: products
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No matching Products Found! Please check your filters again!'}
      );
  })
});

//get list of products to seller's business profile
product.get('/get/seller',checkAuth, (req, res, next) => {
  Product.find({ user_id: req.userData.user_id }).then( (products) => {
    delete products['user_id'];
    console.log(products);
    res.status(200).json(
      {
        message: 'Seller Product list recieved successfully!',
        products: products
      }
    );
  }).then( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No matching Products Found! Please try again'}
      );
  })
});



//get selected product
product.get('/get/:id', (req, res, next) => {

  Product.findOne({ product_id: req.params.id }).then ( (product) => {
    res.status(200).json(
      {
        message: 'product recieved successfully!',
        product: product
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while loading product Details! Please try another time!'}
      );
  })
});


module.exports = product;
