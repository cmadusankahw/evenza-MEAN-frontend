//model imports
const Admin = require("../../model/admin/admin.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron"); // running scheduled tasks

// express app imports
const adminBackup = require("./admin-backup");
const adminDbdata = require("./admin-dbdata");
const adminPayment = require("./admin-payment");
const adminLocation = require("./admin-location");
const adminImg = require("./admin-img");

//express app declaration
const admin = express();

//middleware
admin.use(bodyParser.json());
admin.use(bodyParser.urlencoded({ extended: false }));

// express app includes
admin.use('/backup', adminBackup);
admin.use('/dbdata', adminDbdata);
admin.use('/payment', adminPayment);
admin.use('/location', adminLocation);
admin.use('/img', adminImg);

// running scheduled payment updates
// schedule tasks to be run on the server - update payments
cron.schedule("* * 28 * *", function () {
  var i = 0;
  Admin.findOne().select('payment_details subscription_fee').then(result => {

    var paymentDetails = result.payment_details;
    var merchantIndex = 0;
    var paysIndex = 0;
    var dueAmt = result.subscription_fee;
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
