const Product = require ("../../model/product/product.model");
const Merchant = require ("../../model/auth/merchant.model");
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");
const Selreport = require("./seller-reports");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");

//express app declaration
const seller = express();


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
    cb(error,"src/assets/images/merchant");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
seller.use(bodyParser.json());
seller.use(bodyParser.urlencoded({ extended: false }));


// add seller photos
seller.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let imagePaths = [];
    for (let f of req.files){
      imagePaths.push(url+ "/images/merchant/" + f.filename);
    }
    res.status(200).json({
      imagePaths: imagePaths
    });

});


//update order state
seller.post('/order/edit',checkAuth, (req, res, next) => {

  Order.findOneAndUpdate({ 'order_id': req.body.orderId},{'state':req.body.state}).then( (recievedOrder) => {
    console.log(recievedOrder);
    res.status(200).json(
      {
        message: 'Order state updated successfully!',
        order: recievedOrder
      }
    );
  }).catch( err => {
       console.log(err);
      res.status(500).json(
        { message: 'Error while updating Order State! Please Retry!'}
        );
    });
});


// get methods

//get list of orders
seller.get('/order/get',checkAuth, (req, res, next) => {
  Order.find({'seller.seller_id': req.userData.user_id},function (err, orders) {
    console.log(orders);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No Orders Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'orders list recieved successfully!',
        orders: orders
      }
    );
  });
});


//get list of products
seller.get('/product/get',checkAuth, (req, res, next) => {
  Product.find({'user_id': req.userData.user_id},function (err, prods) {
    console.log(prods);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No Products Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'product list recieved successfully!',
        products: prods
      }
    );
  });
});


//get selected order
seller.get('/order/get/:id',checkAuth, (req, res, next) => {
  Order.findOne({ 'order_id': req.params.id }, function (err,recievedOrder) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while loading Order Details! Please Retry!'}
        );
    });
    console.log(recievedOrder);
    res.status(200).json(
      {
        message: 'Order recieved successfully!',
        order: recievedOrder
      }
    );
  });
});


//get dashboard stats
seller.get('/stat/get',checkAuth, (req, res, next) => {

  var orderQuery = Order.find({ 'seller.seller_id': req.userData.user_id}).select(' order_id product_id product quantity qty_type product_category state created_date commission_due amount_paid amount');

  orderQuery.exec().then((resOrders) => {
    console.log(resOrders);
      res.status(200).json(
        {
          message: 'Report Data recieved successfully!',
          orders: resOrders,
        });
  }).catch( err=> {
    console.log(err);
  })
});



//get service provider names list for report queries
seller.get('/get/selnames', checkAuth, (req, res, next) => {

  var query = Product.find({ user_id: req.userData.user_id }).select('product product_id');

  query.exec().then((resBooks) => {
    console.log(resBooks);
    res.status(200).json(
      {
        message: 'Report Data recieved successfully!',
        selnames: resBooks
      });
  }).catch(err => {
    console.log(err);
  })
});


//get service provider names list for report queries
seller.get('/get/selid', checkAuth, (req, res, next) => {
    res.status(200).json(
      {
        id: req.userData.user_id
      });
  });


// send an  email
seller.post("/mail", checkAuth, (req,res,next) => {
  let mail = req.body;
  mail.email = req.userData.email;
  console.log(mail);
  email.sendMail(mail, info => {
    res.status(200).json(
      {
        message: 'mail sent successfully!',
        info: info
      }
    );
  }).catch(err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'mail sending failed!',
      }
    );
  })
});

seller.use('/reports', Selreport);

module.exports = seller;
