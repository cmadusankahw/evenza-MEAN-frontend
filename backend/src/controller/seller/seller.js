const Product = require ("../../model/product/product.model");
const Merchant = require ("../../model/auth/merchant.model");
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const nodemailer = require("nodemailer");

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


 // change order state


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

  Order.findOneAndUpdate({ 'order_id': req.body.orderId},{'state':req.body.state}, function (err,recievedOrder) {
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'Error while updating Order State! Please Retry!'}
        );
    });
    console.log(recievedOrder);
    res.status(200).json(
      {
        message: 'Order state updated successfully!',
        order: recievedOrder
      }
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


// send an  email
seller.post("/mail", checkAuth, (req,res,next) => {
  let mail = req.body;
  mail.email = req.userData.email;
  console.log(mail);
  sendMail(mail, info => {
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


// nodemailer send email function
async function sendMail(mail, callback) {

  let testAccount = await nodemailer.createTestAccount();

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






module.exports = seller;
