const Service = require ("../../model/service/service.model");
const Merchant = require ("../../model/auth/merchant.model");
const Admin = require("../../model/admin/admin.model");
const Booking = require("../../model/service/booking.model");
const Appointment = require ("../../model/service/appointment.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const spreport = express();

//middleware
spreport.use(bodyParser.json());
spreport.use(bodyParser.urlencoded({ extended: false }));


// report: bookings - between 2 dates with year and month
spreport.post('/booking',checkAuth, (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);

  Booking.aggregate(
    [
      {
        '$match': {
          'from_date': {
            '$gte': new Date(reqFromDate)
          },
          'to_date': {
            '$lte': new Date(reqToDate)
          }
        }
      }, {
        '$project': {
          'year': {
            '$year': '$from_date'
          },
          'month': {
            '$month': '$from_date'
          },
          'booking_id': 1,
          'amount': 1,
          'amount_paid': 1,
          'commision_due': 1,
          'from_date': 1,
          'to_date': 1,
          'duration': 1,
          'user': 1,
          'serviceProvider': 1,
          'rate_type': 1,
          'business_name': 1,
          'service_category': 1,
          'state': 1,
          'service_name': 1,
          'service_id' : 1
        }
      },
       {
        '$sort': {
          'from_date': 1
        }
      }
    ]
  ).then( ( bookings) => {
    console.log(bookings);

      res.status(200).json(
        {
          message: 'booking list recieved successfully!',
          bookings: bookings
        }
      );

  });
});



// report: appontments - between 2 dates with year and month
spreport.post('/appoint',checkAuth, (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);

  Appointment.aggregate(
    [
      {
        '$match': {
          'appointed_date': {
            '$gte': new Date(reqFromDate)
          }
        }
      }, {
        '$project': {
          'year': {
            '$year': '$appointed_date'
          },
          'month': {
            '$month': '$appointed_date'
          },
          'appoint_id': 1,
          'appointed_date': 1,
          'user': 1,
          'serviceProvider': 1,
          'business_name': 1,
          'service_category': 1,
          'state': 1,
          'service_name': 1,
          'service_id' : 1
        }
      },
       {
        '$sort': {
          'appointed_date': 1
        }
      }
    ]
  ).then( (appoints) => {
    console.log(appoints);

      res.status(200).json(
        {
          message: 'appointment details recieved successfully!',
          appoints: appoints
        }
      );

  });
});



// report: appontments - between 2 dates with year and month
spreport.get('/payment',checkAuth, (req, res, next) => {
  console.log(req.body);
  var PaymentDetail;
  Admin.findOne().select('payment_details').then( result => {
    var paymentDetails = result.payment_details;
    for(let pd of paymentDetails) {
       if (pd.user_id == req.userData.user_id) {
        PaymentDetail = pd;
       }
      }
  Booking.find({'serviceProvider.serviceProvider_id': req.userData.user_id}).select('booking_id service_name service_id user.name amount_paid amount created_date').then( (pdetails) => {
    console.log(' P & E ::::::' ,PaymentDetail, pdetails);
      res.status(200).json(
        {
          message: 'appointment details recieved successfully!',
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
spreport.post('/booking/count',checkAuth, (req, res, next) => {
  console.log(req.body);
  reqFromDate = new Date(req.body.fromDate);
  reqToDate = new Date(req.body.toDate);

  Booking.aggregate(
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
            'completed': [
              {
                '$match': {
                  'state': {
                    '$exists': true,
                    '$in': [
                      'completed'
                    ]
                  }
                }
              }, {
                '$count': 'completed'
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
            'completed': {
              '$arrayElemAt': [
                '$completed.completed', 0
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
          message: 'booking counts recieved successfully!',
          counts: bcounts
        }
      );

  });
});



// send an  email
spreport.post("/mail", checkAuth, (req,res,next) => {
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


module.exports = spreport;
