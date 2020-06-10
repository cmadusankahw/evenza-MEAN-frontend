//model imports
const Product = require("../../model/product/product.model");
const ProductCategories = require("../../model/product/categories.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const Merchant = require("../../model/auth/merchant.model");
const Order = require ("../../model/product/order.model");
const DeliveryService = require("../../model/product/deliveryService.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const nodemailer = require ("nodemailer");

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
product.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
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
product.delete('/edit/:id',checkAuth, (req, res, next) => {
  Product.deleteOne({'product_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Product deleted!" });
    }
  ).catch((err) => {
    res.status(500).json({ message: "Product was not deleted! Please try again!" });
  })
});


//search products
product.post('/search', (req, res, next) => {

  Product.find({product_category: req.body.category,
                price: {$gte: req.body.minPrice},
                pay_on_delivery:req.body.payOnDelivery,
                rating: {$gte: req.body.userRating},
                'availability': true,
                'inventory': {$gte: 1}})
  .then(result => {
      res.status(200).json({
        message: 'products recieved successfully!',
        products: result
      });
    })
    .catch(err=>{
      res.status(500).json({
        message: 'No matching products Found!'
      });
    });
});



//add new order
product.post('/order/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqOrder = req.body;
  let sellerId;
  // generate id
  Order.find(function (err, recievedOrders) {
    if(recievedOrders.length){
      lastid = recievedOrders[recievedOrders.length-1].order_id;
    } else {
      lastid= 'OR0';
    }
    let mId = +(lastid.slice(2));
    ++mId;
    lastid = 'OR' + mId.toString();
    console.log(lastid);
    reqOrder['order_id']= lastid; // last id
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json({
        message: 'Error occured while generating Order Id! Please Retry!'
      });
    });
  }).then( () => {
    // get service provider id and incrementing no_of_appoints
    Product.findOneAndUpdate({'product_id': req.body.product_id},{$inc : {no_of_orders: 1} , $inc: {inventory: -(reqOrder.quantity/2)}},function (err, recievedProduct) {
      console.log(recievedProduct);
      sellerId = recievedProduct.user_id; // serviceProvider id
      if (err) return handleError(err => {
        console.log(err);
        res.status(500).json({
          message: 'Error occured while placing Order! Please Retry!'
        });
      });
  }).then( () => {
    // get customer name
    EventPlanner.findOne({'user_id': req.userData.user_id}, function (err, recievedPlanner) {
      console.log(recievedPlanner);
      reqOrder.user = {
        'user_id':req.userData.user_id,
        'email': recievedPlanner.email,
        'name': recievedPlanner.first_name + ' ' + recievedPlanner.last_name
      }
      if (err) return handleError(err => {
        console.log(err);
        res.status(500).json({
          message: 'Error occured while placing Order! Please Retry!'
        });
      });
      }).then(() => {
        Merchant.findOne({'user_id': sellerId}, function (err, recievedMerchant){
          reqOrder.seller = {
            'seller_id':sellerId,
            'email': recievedMerchant.email,
            'name': recievedMerchant.first_name + ' ' + recievedMerchant.last_name
          }
          if (err) return handleError(err => {
            console.log(err);
            res.status(500).json({
              message: 'Error occured while placing Order! Please Retry!'
            });
          });
          const mail= {
            email:recievedMerchant.email,
            subject: "New Order on " + req.body.product,
            html: createHTML(req.body)
          }
          console.log(mail);
          const newOrder = new Order(reqOrder);
          console.log(' final order ', newOrder);
          newOrder.save().then(result => {
              sendMail(mail, () => {});
              res.status(200).json({
                message: 'Order created successfully!',
                orderId: result.order_id // booking id as result
              });
            });
      });
      }).catch (err => {
        console.log('then 2 ', err);
        res.status(500).json({
          message: 'Error occured while placing Order! Please Retry!'
        });
      }); // then 3
    }).catch (err => {
      console.log('then 2 ', err);
      res.status(500).json({
        message: 'Error occured while placing Order! Please Retry!'
      });
    }); // then 3
 }).catch (err => {
   console.log('then 1 ', err);
   res.status(500).json({
    message: 'Error occured while placing Order! Please Retry!'
  });
 });
});



// get methods

//get list of products for search
product.get('/get', (req, res, next) => {
  Product.find({'availability': true,
                'inventory': {$gte: 1}},function (err, products) {
    console.log(products);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No matching Products Found! Please check your filters again!'}
        );
    });
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        products: products
      }
    );
  });
});

//get list of products to seller's business profile
product.get('/get/seller',checkAuth, (req, res, next) => {
  Product.find({ user_id: req.userData.user_id },function (err, products) {
    delete products['user_id'];
    console.log(products);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No matching Products Found! Please try again'}
        );
    });
    res.status(200).json(
      {
        message: 'Seller Product list recieved successfully!',
        products: products
      }
    );
  });
});



//get selected product
product.get('/get/:id', (req, res, next) => {

  Product.findOne({ product_id: req.params.id }, function (err,product) {
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'Error while loading product Details! Please try another time!'}
        );
    });
    res.status(200).json(
      {
        message: 'product recieved successfully!',
        product: product
      }
    );
  });
});

//get product categories
product.get('/cat', (req, res, next) => {

  ProductCategories.find(function (err, categories) {
    console.log(categories);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Product categories recieved successfully!',
        categories: categories
      }
    );
  });
});



//get delivery services
product.get('/delivery', (req, res, next) => {

  DeliveryService.find(function (err, deliveryServices) {
    console.log(deliveryServices);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'Delivery Services recieved successfully!',
        deliveryServices: deliveryServices
      }
    );
  });
});

// to be removed
//get product id of the last product
product.get('/last', (req, res, next) => {
  Product.find(function (err, products) {
    var lastid;
    if(products.length){
      lastid = products[products.length-1].product_id;
    } else {
      lastid= 'P0';
    }
    console.log(lastid);
    if (err) return handleError(err);
    res.status(200).json(
      {
        lastid: lastid
      }
    );
  });
});



// nodemailer send email function
async function sendMail(mail, callback) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'chiran.hw@gmail.com',
      pass: 'chim2cls2ppt'
    }
  });

  let mailOptions = {
    from: '"Evenza HelpDesk "<support@evenza.biz>', // sender address
    to: mail.email, // list of receivers
    subject: mail.subject, // Subject line
    html: mail.html
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// create custom HTML
function createHTML(content) {
   const message = "<h3> You have new Order on " + content.product + "</h3><hr><h4>Order ID : <b> " + content.order_id + "</b></h4><h4>Date : <b> " +content.created_date.slice(0,10) + ' ' + content.created_date.slice(11,19) + " </b></h4><h4>Quantity : <b> " + content.quantity + " </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  }




module.exports = product;
