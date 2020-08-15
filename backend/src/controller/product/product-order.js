//model imports
const Product = require("../../model/product/product.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const Merchant = require("../../model/auth/merchant.model");
const Order = require ("../../model/product/order.model");
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const productOrder = express();

//middleware
productOrder.use(bodyParser.json());
productOrder.use(bodyParser.urlencoded({ extended: false }));

// REST API

//add new order
productOrder.post('/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqOrder = req.body;
  let sellerId;
  // generate id
  Order.find().select('order_id').sort('order_id').then( (recievedOrders) => {
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

    // get service provider id and incrementing no_of_appoints
    Product.findOneAndUpdate({'product_id': req.body.product_id},{$inc : {no_of_orders: 1} , $inc: {inventory: -(reqOrder.quantity)}})
    .then(recievedProduct => {
      console.log(recievedProduct);
      sellerId = recievedProduct.user_id; // serviceProvider id

    // get customer name
    EventPlanner.findOne({'user_id': req.userData.user_id}).then( (recievedPlanner) =>  {
      console.log(recievedPlanner);
      // set customer data
      reqOrder.user = {
        'user_id':req.userData.user_id,
        'email': recievedPlanner.email,
        'name': recievedPlanner.first_name + ' ' + recievedPlanner.last_name
      };
        // find seller data
        Merchant.findOne({'user_id': sellerId}).then( (recievedMerchant) => {
          reqOrder.seller = {
            'seller_id':sellerId,
            'email': recievedMerchant.email,
            'name': recievedMerchant.first_name + ' ' + recievedMerchant.last_name
          };
          // create mail
          const mail= {
            email:recievedMerchant.email,
            subject: "New Order on " + req.body.product,
            html: createHTML(req.body)
          };
          console.log(mail);
          const newOrder = new Order(reqOrder);
          console.log(' final order ', newOrder);
          newOrder.save().then(result => {
              email.sendMail(mail, () => {});
              res.status(200).json({
                message: 'Order created successfully!',
                orderId: result.order_id // booking id as result
              });
            }).catch (err => {
              console.log('then 5 ', err);
              res.status(500).json({
                message: 'Error occured while placing Order! Please Retry!'
              });
          });
      }).catch (err => {
        console.log('then 4 ', err);
        res.status(500).json({
          message: 'Error occured while placing Order! Please Retry!'
        });
      }); // then 3
 }).catch (err => {
   console.log('then 3 ', err);
   res.status(500).json({
    message: 'Error occured while placing Order! Please Retry!'
  });
 });
}).catch (err => {
  console.log('then 2 ', err);
  res.status(500).json({
   message: 'Error occured while placing Order! Please Retry!'
 });
});
}).catch (err => {
  console.log('then 1 ', err);
  res.status(500).json({
   message: 'Error occured while placing Order! Please Retry!'
 });
});
});


// manipulat event when creating a booking
productOrder.post('/event', (req, res, next) => {

  var pCategories;

  Event.findOne({ event_id : req.body.event_id})
  .then( result => {
    console.log(result);
      // filter booked products from service categories
      pCategories = result.product_categories;
      pCategories = pCategories.filter(obj => obj.category !== req.body.product_category);

      // updating the event
       Event.updateOne({event_id: req.body.event_id},{
          $push : {'event_segments.products' : {
            product_id: req.body.product_id,
            product:  req.body.product,
            product_category:  req.body.product_category,
            order_id:  req.body.order_id,
            allocated_budget:  req.body.allocated_budget,
            spent_budget:  req.body.spent_budget,
            ordered_date:  req.body.ordered_date,
            state: 'ordered'
          }},
         'product_categories': pCategories,
          $inc: { 'total_spent_budget': req.body.spent_budget }
       }).then( (updatedResult) => {
         console.log(updatedResult);
      res.status(200).json({
        message: 'order deatils updated to the event successfully!!',
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while placing your order! Please try again!'
      });
    });
}).catch(err=>{
  console.log(err);
  res.status(500).json({
    message: 'Error occured while placing your order! Please try again!'
  });
});
});

// create custom HTML
function createHTML(content) {
   const message = "<h3> You have new Order on " + content.product + "</h3><hr><h4>Order ID : <b> " + content.order_id + "</b></h4><h4>Date : <b> " +content.created_date.slice(0,10) + ' ' + content.created_date.slice(11,19) + " </b></h4><h4>Quantity : <b> " + content.quantity + " </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  }

module.exports = productOrder;
