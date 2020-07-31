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


// update tasks list when closing the component ( need to add service, product mgmt also)
event.post('/plan/update',checkAuth, (req, res, next) => {
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

// update tasks list when closing the component ( need to add service, product mgmt also)
event.post('/participants/update',checkAuth, (req, res, next) => {
  console.log(req.body);
  // add updating services, products lists as well
  Event.updateOne({event_id: req.body.eventId}, {
     'participants.participants' : req.body.participants,
     'state':'unpublished',
     $set: { 'alerts.0': req.body.invitation}
   }).then( result => {
    console.log(result);
    res.status(200).json({ message: "Changes were successfully Updated!" });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Update were unsuccessfull! Please try again!" });
   });
});


// update tasks list when closing the component ( need to add service, product mgmt also)
event.post('/publish',checkAuth, (req, res, next) => {
  console.log(req.body);
  var event;
  // add updating services, products lists as well
  Event.findOne({event_id: req.body.eventId}).then( result => {

      pars = result.participants.participants;
      console.log('recieved participants: ',pars);
      // sending mails to participants
      for (const  doc of pars) {
        const mail= {
          email:doc.email,
          subject: result.alerts[0].heading,
          html: createHTML(result.alerts[0].message,doc.participant_id,req.body.eventId)
        };
        console.log( 'new Mail:' , mail);
        sendMail(mail, () => {});
        const index = pars.indexOf(doc);
        pars[index].state = "invited";
      }
      // finally update the modified event
      Event.updateOne({event_id: req.body.eventId},{
        'state': "published",
        'participants.participants': pars
      }).then( (updatedResult) => {
        console.log(updatedResult);
        res.status(200).json({ message: "Event Publish was Successfull!" });
      }).catch( err => {
        console.log(err);
        res.status(500).json({ message: "Event Not Publiished! Please try again!" });
       });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Event Not Publiished! Please try again!" });
   });
});

// confirm participation
event.get('/confirm/:id', (req, res, next) => {
  var idS = req.params.id.split('_');
  console.log(idS);
  var pars;

  Event.findOne({event_id: idS[1]}).then( result => {
    pars = result.participants.participants;
    console.log('recieved participants: ',pars);
    // find and update confirmed participant state
    for (const  doc of pars) {
     if( doc.participant_id == idS[0]){
      const index = pars.indexOf(doc);
      pars[index].state = "accepted";
     }
    };
    Event.updateOne({event_id: idS[1]},{
      'participants.participants': pars
    }).then( (updatedResult) => {
      console.log(updatedResult);
      res.status(200).json({ message: "Your participation successfully confirmed!" });
    }).catch( err => {
      console.log(err);
      res.status(500).json({ message: "Confirmation Unsuccessful! Please try again!"});
     });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Confirmation Unsuccessful! Please try again!" });
   });
  });


 // get task alerts
event.get('/get/alerts/:id', (req, res, next) => {

  var today = new Date();

  var alerts;
  var sendAlerts = [];

  Event.findOne({event_id: req.params.id}).then( result => {
    alerts = result.event_segments.tasks;
    console.log('recieved tasks: ',alerts);
    // find and update confirmed participant state
    for (const  doc of alerts) {

      // necessary date operations
      scheduledDate = new Date(doc.scheduled_from_date);
      var hours = Math.floor(Math.abs(today - scheduledDate) / 36e5);
      console.log ('Difference in hours :' ,hours);

      // date comparisons by hours
      if( hours> 0){
        if  (hours < 6) {
          sendAlerts.push({
            id: doc.task_id,
            heading: doc.title,
            message: doc.description,
            date: doc.scheduled_from_date,
            state: "danger"
          });
        } else if (hours < 24) {
          sendAlerts.push({
            id: doc.task_id,
            heading: doc.title,
            message: doc.description,
            date: doc.scheduled_from_date,
            state: "warning"
          });
        } else if (hours < 72) {
          sendAlerts.push({
            id: doc.task_id,
            heading: doc.title,
            message: doc.description,
            date: doc.scheduled_from_date,
            state: "info"
          });
        }
      // creating alert

      };
    };

    // sorting according to the date
    sendAlerts.sort(function(a,b) {return (a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0);} );

    // send finalized alerts array to the client
    console.log('final alerts : ',sendAlerts);
    res.status(200).json({
      alerts: sendAlerts,
      message: "Alerts retrived successfully!"
    });
    }).catch( err => {
      console.log(err);
      res.status(500).json({ message: "Alerts retrival Unsuccessful! Please try again!"});
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
function createHTML(content, pid, eventId) {
   const message = "<h3> Invitation </h3><br> Dear Sir/Madam, <br><br>" + content
   +"<br><br> Click below link to confirm your participation:<hr> <b> <a href='http://localhost:3000/api/event/confirm/"+ pid + '_' + eventId + "' target='_blank'> Conirm My Participation</a></br>"
   + "<div> <hr> Thank You, <br> Your Sincere, <br><br> Event Organizer at Evenza</div>"
   return message;
  }




module.exports = event;
