const Product = require ("../../model/product/product.model");
const Merchant = require ("../../model/auth/merchant.model");
const Admin = require("../../model/admin/admin.model");
const Order = require("../../model/product/order.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const selreport = express();

//middleware
selreport.use(bodyParser.json());
selreport.use(bodyParser.urlencoded({ extended: false }));


// report: bookings - between 2 dates with year and month
selreport.post('/orders',checkAuth, (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);

  Order.aggregate(
    [
      {
        '$match': {
          'created_date': {
            '$gte': new Date(reqFromDate)
          },
          'created_date': {
            '$lte': new Date(reqToDate)
          }
        }
      }, {
        '$project': {
          'year': {
            '$year': '$created_date'
          },
          'month': {
            '$month': '$created_date'
          },
          'order_id': 1,
          'amount': 1,
          'amount_paid': 1,
          'commision_due': 1,
          'created_date': 1,
          'user': 1,
          'seller': 1,
          'qty_type': 1,
          'business_name': 1,
          'product_category': 1,
          'state': 1,
          'product': 1,
          'product_id' : 1,
          'delivery_service':1,
          'delivery_address':1,
          'quantity':1
        }
      },
       {
        '$sort': {
          'created_date': 1
        }
      }
    ]
  ).then( ( orders) => {
    console.log(orders);

      res.status(200).json(
        {
          message: 'orders list recieved successfully!',
          orders: orders
        }
      );

  });
});


// report: appontments - between 2 dates with year and month
selreport.get('/payment',checkAuth, (req, res, next) => {
  console.log(req.body);
  var PaymentDetail;
  Admin.findOne().select('payment_details').then( result => {
    var paymentDetails = result.payment_details;
    for(let pd of paymentDetails) {
       if (pd.user_id == req.userData.user_id) {
        PaymentDetail = pd;
       }
      }
  Order.find({'seller.seller_id': req.userData.user_id}).select('order_id product product_id user.name amount_paid amount created_date').then( (pdetails) => {
    console.log(' P & E ::::::' ,PaymentDetail, pdetails);
      res.status(200).json(
        {
          message: 'payment details recieved successfully!',
          payments: PaymentDetail,
          earnings: pdetails
        }
      );

  }).catch( err => {
    console.log(err);
  })
}).catch( err => {
  console.log(err);
})
});

// report: bookings - between 2 dates with year and month - filter booking_type
selreport.post('/order/count',checkAuth, (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);

  Order.aggregate(
    [
      {
        '$match': {
          'from_date': {
            '$gte': new Date('Fri, 07 Aug 2020 08:00:00 GMT')
          },
          'to_date': {
            '$lte': new Date('Sat, 08 Aug 2020 08:00:00 GMT')
          }
        }
      },
        {
          '$facet': {
            'pending': [
              {
                '$match': {
                  'state': {
                    '$exists': true,
                    '$in': [
                      'pending'
                    ]
                  }
                }
              }, {
                '$count': 'pending'
              }
            ],
            'delivered': [
              {
                '$match': {
                  'state': {
                    '$exists': true,
                    '$in': [
                      'delivered'
                    ]
                  }
                }
              }, {
                '$count': 'delivered'
              }
            ],
            'cancelled': [
              {
                '$match': {
                  'state': {
                    '$exists': true,
                    '$in': [
                      'cancelled'
                    ]
                  }
                }
              }, {
                '$count': 'cancelled'
              }
            ]
          }
        }, {}, {
          '$project': {
            'pending': {
              '$arrayElemAt': [
                '$pending.pending', 0
              ]
            },
            'delivered': {
              '$arrayElemAt': [
                '$delivered.delivered', 0
              ]
            },
            'cancelled': {
              '$arrayElemAt': [
                '$cancelled.cancelled', 0
              ]
            }
          }
        }

    ]
  ).then( (bcounts) => {
    console.log(bcounts);

      res.status(200).json(
        {
          message: 'order counts recieved successfully!',
          counts: bcounts
        }
      );

  });
});


// send an  email
selreport.post("/mail", checkAuth, (req,res,next) => {
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


module.exports = selreport;
