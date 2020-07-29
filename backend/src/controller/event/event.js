//model imports
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


// add category photos
event.post('/cat/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePaths = [];
  for (let f of req.files){
    imagePaths.push(url+ "/images/events/" + f.filename);
  }
  res.status(200).json({
    imagePath: imagePaths[0]
  });
});

// create event category
event.post('/cat/create', (req, res, next) => {

  var category = new EventCategories(req.body);
  category.save().then( function (err, category) {
    console.log(category);
    if (err) return handleError(err);
    res.status(200).json(
      {
        message: 'event category added successfully!',
      }
    );
  });
});

// remove event category
event.post('/cat/remove',checkAuth, (req, res, next) => {
  EventCategories.deleteOne({'event_id': req.body.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "event category removed!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "event category was not removed! Please try again!" });
  })
});

// add category photos
event.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const imagePath = (url+ "/images/events/" + req.files[0].filename);
  console.log(imagePath);
  res.status(200).json({
    imageUrl: imagePath
  });
});


//add new event
event.post('/add',checkAuth, (req, res, next) => {
  var lastid;
  var IdQuery = Event.find().select('event_id');

  IdQuery.exec().then((events)=> {
    if(events.length){
      lastid = events[events.length-1].event_id;
    } else {
      lastid= 'E0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'E' + mId.toString();
    console.log(lastid);
  }).then( () => {
    const reqevent = req.body;
    reqevent['event_id']= lastid;
    reqevent['host']= {
      user_id: req.userData.user_id,
      email: req.userData.email,
      name: ''
    }
    const newevent = new Event(reqevent);
    console.log(newevent);
    newevent.save()
    .then(result => {
        res.status(200).json({
          message: 'event added successfully!',
          result: result
        });
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          message: 'event creation was unsuccessful! Please try again!'
        });
      });
  }).catch(err=>{
    console.log(err);
    res.status(500).json({
      message: 'event creation was unsuccessful! Please try again!'
    });
  });
 });


// edit event photos
event.post('/edit/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let imagePath;
  if (req.files[0]){
    imagePath = (url+ "/images/events/" + req.files[0].filename);
  }
  res.status(200).json({
    message: "image upload successfull",
    imageUrl: imagePath
  });
});

//cancel an event
event.post('/edit',checkAuth, (req, res, next) => {
  Event.updateOne({'event_id': req.body.event_id}, {
    event_title: req.body.event_title,
    description: req.body.description,
    event_type:  req.body.event_type,
    event_category:  req.body.event_category,
    from_date:  req.body.from_date,
    to_date:  req.body.to_date,
    location: req.body.location,
    no_of_participants:  req.body.no_of_participants,
    total_budget:  req.body.total_budget,
    service_categories: req.body.service_categories,
    product_categories: req.body.product_categories,
    feature_img:  req.body.feature_img,
    state:  'unpublished',
    social_links:  req.body.social_links,
  }).then(
    // should include sending cancellation notices for pending services, orders and all participnts
    result => {
      console.log(result);
      res.status(200).json({ message: "event details updated successfully! Please Publish event!" });
    }
  ).catch((err) => {
    res.status(500).json({ message: "event details update failed Please try again!" });
  })
});


//cancel an event
event.post('/remove',checkAuth, (req, res, next) => {
  Event.updateOne({'event_id': req.body.event_id}, {
    state: 'cancelled'
  }).then(
    // should include sending cancellation notices for pending services, orders and all participnts
    result => {
      console.log(result);
      res.status(200).json({ message: "event was cancelled!" });
    }
  ).catch((err) => {
    res.status(500).json({ message: "cancel request failed Please try again!" });
  })
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

// task management
event.post('/tasks/add',checkAuth, (req, res, next) => {
  Event.updateOne({'event_id': req.body.eventId}, {
  $push : {'event_segments.tasks' : req.body.task}
  }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "task created!" });
    }
  ).catch((err) => {
    res.status(500).json({ message: "task creation failed Please try again!" });
  })
});


// tupdate tasks list when closing the component ( need to add service mgmt also)
event.post('/tasks/update',checkAuth, (req, res, next) => {
  console.log(req.body);
  // add updating services, products lists as well
  Event.updateOne({event_id: req.body.eventId}, {
     'event_segments.tasks' : req.body.tasks
   }).then( result => {
    console.log(result);
    res.status(200).json({ message: "Changes were successfully Updated!" });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Update were unsuccessfull! Please try again!" });
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
