//model imports
const ProductCategories = require("../../model/product/categories.model");
const ServiceCategories = require("../../model/service/categories.model");
const EventCategories = require("../../model/event/categories.model");
const Event = require("../../model/event/event.model");
const EventPlanner = require("../../model/auth/eventPlanner.model");
const Order = require ("../../model/product/order.model");
const Booking = require ("../../model/service/booking.model");
const checkAuth = require("../../middleware/auth-check");
const Login = require("../../../data/user/emailAuthentication.json");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const nodemailer = require ("nodemailer");

//express app declaration
const event = express();


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
    cb(error,"src/assets/images/events");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
event.use(bodyParser.json());
event.use(bodyParser.urlencoded({ extended: false }));


// add event photos
event.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePaths = [];
  for (let f of req.files){
    imagePaths.push(url+ "/images/events/" + f.filename);
  }
  res.status(200).json({
    imagePaths: imagePaths
  });

});


//add new event
event.post('/add',checkAuth, (req, res, next) => {
  var lastid;
  event.find(function (err, events) {
    if(events.length){
      lastid = events[events.length-1].event_id;
    } else {
      lastid= 'P0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'P' + mId.toString();
    console.log(lastid);
    if (err) return handleError(err => {
      res.status(500).json({
        message: 'Error occured while getting event ID details!'
      });
    });
  }).then( () => {
    const reqevent = req.body;
    reqevent['event_id']= lastid;
    reqevent['user_id']= req.userData.user_id;
    const newevent = new event(reqevent);
    console.log(newevent);
    newevent.save()
    .then(result => {
        res.status(200).json({
          message: 'event added successfully!',
          result: result
        });
      })
      .catch(err=>{
        res.status(500).json({
          message: 'event creation was unsuccessful! Please try again!'
        });
      });
  });
 });


//edit event
event.post('/edit',checkAuth, (req, res, next) => {
  const newevent = new event(req.body);
  console.log(newevent);
  event.updateOne({ event_id: req.body.event_id}, {
    business_name:  req.body.business_name,
    event: req.body.event,
    event_category: req.body.event_category,
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
      message: 'event updated successfully!',
      result: result
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: 'event update was unsuccessful! Please Try again!'
    });
  });
});


//remove a event
event.delete('/edit/:id',checkAuth, (req, res, next) => {
  event.deleteOne({'event_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "event deleted!" });
    }
  ).catch((err) => {
    res.status(500).json({ message: "event was not deleted! Please try again!" });
  })
});


//search events
event.post('/search', (req, res, next) => {

  event.find({event_category: req.body.category,
                price: {$gte: req.body.minPrice},
                pay_on_delivery:req.body.payOnDelivery,
                rating: {$gte: req.body.userRating},
                'availability': true,
                'inventory': {$gte: 1}})
  .then(result => {
      res.status(200).json({
        message: 'events recieved successfully!',
        events: result
      });
    })
    .catch(err=>{
      res.status(500).json({
        message: 'No matching events Found!'
      });
    });
});





// get methods

//get list of events for event cards
event.get('/get',checkAuth, (req, res, next) => {

 var query =  Event.find({'host.user_id' : req.userData.user_id })
    .select('event_id event_title description event_category from_date to_date location.homeTown no_of_participants feature_img state');

 query.exec((err, events) => {
    console.log(events);
    if (err) return handleError(err => {
      console.log(err);
      res.status(500).json(
        { message: 'No matching events Found! Please check your filters again!'}
        );
    });
    res.status(200).json(
      {
        message: 'event list recieved successfully!',
        events: events
      }
    );
  });
});

//get event schdule bookings & appointments
event.get('/get/seller',checkAuth, (req, res, next) => {
  event.find({ user_id: req.userData.user_id },function (err, events) {
    delete events['user_id'];
    console.log(events);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No matching events Found! Please try again'}
        );
    });
    res.status(200).json(
      {
        message: 'Seller event list recieved successfully!',
        events: events
      }
    );
  });
});



//get selected event
event.get('/get/:id', (req, res, next) => {

  Event.findOne({ event_id: req.params.id }, function (err,event) {
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'Error while loading event Details! Please try another time!'}
        );
    });
    res.status(200).json(
      {
        message: 'event recieved successfully!',
        event: event
      }
    );
  });
});

//get event categories
event.get('/cat', (req, res, next) => {

  EventCategories.find(function (err, categories) {
    console.log(categories);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'event categories recieved successfully!',
        categories: categories
      }
    );
  });
});


//get event category
event.get('/cat/:id', (req, res, next) => {

  EventCategories.findOne({id: req.params.id },function (err, category) {
    console.log(category);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'event category recieved successfully!',
        category: category
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
      user: Login.user,
      pass: Login.pass
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
   const message = "<h3> You have new Order on " + content.event + "</h3><hr><h4>Order ID : <b> " + content.order_id + "</b></h4><h4>Date : <b> " +content.created_date.slice(0,10) + ' ' + content.created_date.slice(11,19) + " </b></h4><h4>Quantity : <b> " + content.quantity + " </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  }




module.exports = event;
