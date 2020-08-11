//model imports
const Admin = require("../../model/admin/admin.model");
const Booking = require("../../model/service/booking.model");
const Order = require("../../model/product/order.model");
const Merchant = require("../../model/auth/merchant.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");
const path = require('path');


//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
var backup = require('mongodb-backup');
var restore = require('mongodb-restore');
const cron = require("node-cron"); // running scheduled tasks


//express app declaration
const admin = express();


// multer setup for image upload
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif'
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Image");
    if (isValid) {
      error = null;
    }
    cb(error, "src/assets/images/admin");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({ extended: false }));

// running scheduled payment updates

// variables

var i = 0;

// schedule tasks to be run on the server - update payments
cron.schedule("* * 28 * *", function () {

  Admin.findOne().select('payment_details').then(result => {

    var paymentDetails = result.payment_details;
    var merchantIndex = 0;
    var paysIndex = 0;
    var dueAmt = 299;
    var timeStamp;
    for (let pd of paymentDetails) {
      for (let p of pd.pays) {
        dueAmt += p.due_amount;
        timeStamp = p.timestamp;
        paysIndex++;
        console.log('P :p',paysIndex);
      }
      // deduct due amount and pass to the latest month
      for (let i = 0; i < paysIndex; i++) {
        paymentDetails[merchantIndex].pays[i].due_amount = 0;
        console.log('i ', i);
      }
      // create new entry to hold updated payment details
      paymentDetails[merchantIndex].pays[paysIndex] = {
        due_amount: dueAmt,
        paid_amount: 0,
        paid_date: null,
        timestamp: {
          year: timeStamp.year,
          month: timeStamp.month + 1,
        }
      }
      merchantIndex++;
      paysIndex = 0;
      console.log('M :', merchantIndex)
    }
    console.log(paymentDetails);
    Admin.updateOne({}, {
      'payment_details': paymentDetails
    }).then((res2) => {
      console.log(res2);
    }).catch(err => {
      console.log(err);
    })
  }).catch(err => {
    console.log(err);
  })
});


// add admin photos
admin.post('/add/img', checkAuth, multer({ storage: storage }).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let image01Path, image02Path, image03Path = null;
  let imagePaths = [];
  for (let f of req.files) {
    imagePaths.push(url + "/images/admin/" + f.filename);
  }
  res.status(200).json({ imagePaths: imagePaths });

});

// update admin payment details
// auto update once id paid, or -> paid_amount
// auto update on month end -> due amount
admin.post('/update/payments', (req, res, next) => {
  Admin.updateOne({ user_id: req.userData.user_id }, {
    // update data
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'admin profile updated successfully!',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Profile Details update unsuccessfull! Please Try Again!'
      });
    });
});


// create a backup
admin.get('/backup/create', (req, res, next) => {
  // const url = req.protocol + '://' + req.get("host");
  backup({
    uri: 'mongodb://localhost:27017/evenza', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: path.join(__dirname, 'database-backup'),
    parsor: 'json',
    tar: 'backup.tar',
    callback: (err) => {
      if (err) {
        console.log(err);
      }
      res.status(200).json({
        message: 'backup created successfully!',
      });
    }
  })



});

// restore from  a backup
admin.post('/backup/restore', (req, res, next) => {
  // const url = req.protocol + '://' + req.get("host");
  restore({
    uri: 'mongodb://localhost:27017/evenza', // mongodb://<dbuser>:<dbpassword>@<dbdomain>.mongolab.com:<dbport>/<dbdatabase>
    root: path.join(__dirname, 'database-backup')
  })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'backup restored successfully!',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Restore failed! Please Try Again!'
      });
    });
});

// get mehods

// get all the user counts for dashboard updating
admin.get('/get/dbdata', checkAuth, (req, res, next) => {

  var eventPlannerCount = EventPlanner.countDocuments();

  var userCount = Merchant.aggregate([
    {
      "$facet": {
        "ServiceProvider": [
          { "$match": { "user_type": 'serviceProvider' } },
          { "$count": "ServiceProvider" },
        ],
        "Seller": [
          { "$match": { "user_type": 'seller' } },
          { "$count": "Seller" }
        ],
      }
    },
    {
      "$project": {
        "sellers": { "$arrayElemAt": ["$Seller.Seller", 0] },
        "serviceProviders": { "$arrayElemAt": ["$ServiceProvider.ServiceProvider", 0] },
      }
    }
  ]);

  var bookingCount = Booking.aggregate([
    {
      "$facet": {
        "Pending": [
          { "$match": { "state": 'pending' } },
          { "$count": "Pending" },
        ],
        "Completed": [
          { "$match": { "state": 'completed' } },
          { "$count": "Completed" }
        ],
        "Cancelled": [
          { "$match": { "state": 'cancelled' } },
          { "$count": "Cancelled" }
        ],
      }
    },
    {
      "$project": {
        "pending": { "$arrayElemAt": ["$Pending.Pending", 0] },
        "completed": { "$arrayElemAt": ["$Completed.Completed", 0] },
        "cancelled": { "$arrayElemAt": ["$Cancelled.Cancelled", 0] },
      }
    }
  ]);


  var orderCount = Order.aggregate([
    {
      "$facet": {
        "Pending": [
          { "$match": { "state": 'pending' } },
          { "$count": "Pending" },
        ],
        "Delivered": [
          { "$match": { "state": 'delivered' } },
          { "$count": "Delivered" }
        ],
        "Cancelled": [
          { "$match": { "state": 'cancelled' } },
          { "$count": "Cancelled" }
        ],
      }
    },
    {
      "$project": {
        "pending": { "$arrayElemAt": ["$Pending.Pending", 0] },
        "delivered": { "$arrayElemAt": ["$Delivered.Delivered", 0] },
        "cancelled": { "$arrayElemAt": ["$Cancelled.Cancelled", 0] },
      }
    }
  ]);



  var dashboardData = {
    bookings: {},
    orders: {},
    users: {}
  }

  userCount.exec().then((resUsers) => {
    dashboardData.users = resUsers;
    orderCount.exec().then((resOrders) => {
      dashboardData.orders = resOrders;
      bookingCount.exec().then((resBookings) => {
        dashboardData.bookings = resBookings;
        console.log(dashboardData);
        res.status(200).json(
          {
            message: 'Dashboard data Recieved Successfully!',
            dashboardData: dashboardData
          }
        );
      })
    })
  }).catch((err) => {
    console.log(err);
    res.status(500).json(
      {
        message: 'Something went wrong while recieving Dashboard Details!'
      });
  });
});


// get all payments details
admin.get('/get/payments', checkAuth, (req, res, next) => {

  var Query = Admin.find({ user_id: req.userData.user_id }).select('payment_details');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      message: 'payment details retrived successfully!',
      paymentDetails: result[0].payment_details
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details Retrival unsuccessfull! Please Try Again!'
      });
    });
});


// get payment details of a single user
admin.get('/get/payment', checkAuth, (req, res, next) => {

  var Query = Admin.findOne().select('payment_details');
  var paymentDetails;
  var merchantPay;

  Query.exec().then((result) => {
    console.log(result);
    paymentDetails = result.payment_details;
    for (let pd of paymentDetails) {
      if (pd.user_id == req.userData.user_id) {
        merchantPay = pd;
      }
    }
    res.status(200).json({
      message: 'payment details retrived successfully!',
      merchantPayment: merchantPay
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details Retrival unsuccessfull! Please Try Again!'
      });
    });
});

// get admin payments
admin.post('/make/payment', checkAuth, (req, res, next) => {

  var Query = Admin.findOne().select('payment_details');
  var paymentDetails;
  var i = 0;
  var merchantIndex = 0;
  var paysIndex = -1;

  Query.exec().then((result) => {
    console.log(result);
    paymentDetails = result.payment_details;
    for (let pd of paymentDetails) {
      if (pd.user_id = req.userData.user_id) {
        merchantIndex = i;
        for (let p of pd.pays) {
          paysIndex++;
        }
      }
      i++;
    }
    console.log(merchantIndex, ' : ', paysIndex);
    // updating payment
    paymentDetails[merchantIndex].pays[paysIndex].paid_amount += req.body.amount;
    paymentDetails[merchantIndex].pays[paysIndex].due_amount -= req.body.amount;
    console.log('final pays :', paymentDetails);
    Admin.updateOne({}, {
      'payment_details': paymentDetails
    }).then(result2 => {
      console.log(result2);
      res.status(200).json({
        message: 'payment details updated successfully!',
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details update unsuccessfull! Please Try Again!'
      });
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Payment Details update unsuccessfull! Please Try Again!'
      });
    });
});

// get service locations
admin.get('/get/location/m', checkAuth, (req, res, next) => {

  var Query = Merchant.find().select('business.location business.title');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      locations: result
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Location details unsuccessfull! Please Try Again!'
      });
    });
});

// get event locations
admin.get('/get/location/e', checkAuth, (req, res, next) => {

  var Query = Event.find().select('location event_title');

  Query.exec().then((result) => {
    console.log(result);
    res.status(200).json({
      locations: result
    });
  })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'Location details unsuccessfull! Please Try Again!'
      });
    });
});

// email business report

// send an  email
admin.post("/report/mail", checkAuth, (req, res, next) => {
  // creating email
  const mail = {
    email: req.userData.email,
    subject: "Generated Report " + req.body.title,
    html: createHTML(req.body.title),
    attachments: [{
      filename: req.body.title + '_Report',
      path: req.body.attachment
    }]
  };
  console.log(mail);
  mail.email = req.userData.email;
  console.log(mail);
  email.sendMail(mail, info => {
    res.status(200).json(
      {
        message: 'Report has emailed successfully!',
      }
    );
  }).catch(err => {
    console.log(err);
    res.status(500).json(
      {
        message: 'email sending failed!',
      }
    );
  })
});


// create custom HTML
function createHTML(title) {
  const message = "<h3> You business report: " + title + " has generated successfully.</h3><hr>"
    + "</b></h4><hr><div class='text-center'><p><b> Please Find the attached Report.<br> <br> For more information, Log in to the System.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
  return message;

}

module.exports = admin;
