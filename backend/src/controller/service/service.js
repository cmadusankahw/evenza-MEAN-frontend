//model imports
const Service = require("../../model/service/service.model");
const Booking = require("../../model/service/booking.model");
const Appointment = require("../../model/service/appointment.model");
const ServiceCategories = require("../../model/service/categories.model");
const EventPlanner = require ("../../model/auth/eventPlanner.model");
const Merchant = require("../../model/auth/merchant.model");
const checkAuth = require("../../middleware/auth-check");
const Login = require("../../../data/user/emailAuthentication.json");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const nodemailer = require("nodemailer");

//express app declaration
const service = express();


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
    cb(error,"src/assets/images/services");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


//middleware
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));


//add new service
service.post('/add',checkAuth, (req, res, next) => {
    var lastid;
    Service.find(function (err, services) {
      if(services.length){
        lastid = services[services.length-1].service_id;
      } else {
        lastid= 'S0';
      }
      let mId = +(lastid.slice(1));
      ++mId;
      lastid = 'S' + mId.toString();
      console.log(lastid);
      if (err) return handleError(err => {
        res.status(500).json({
          message: 'Error occured while getting product ID details!'
        });
      });
    }).then( () => {
    const reqService = req.body;
    reqService['service_id']= lastid;
    reqService['user_id']= req.userData.user_id;
    const newService = new Service(reqService);
    console.log(newService);
    newService.save()
    .then(result => {
        res.status(200).json({
          message: 'service added successfully!',
          result: result
        });
      })
      .catch(err=>{
        res.status(500).json({
          message: 'Service creation was unsuccessfull! Please try Again!'
        });
      });
    });
});

// add service photos
service.post('/add/img',checkAuth, multer({storage:storage}).array("images[]"), (req, res, next) => {
    const url = req.protocol + '://' + req.get("host");
    let image01Path, image02Path, image03Path = null;
    let imagePaths = [];
    for (let f of req.files){
      imagePaths.push(url+ "/images/services/" + f.filename);
    }
    res.status(200).json({imagePaths: imagePaths});

});

//edit service
service.post('/edit',checkAuth, (req, res, next) => {
  const newService = new Service(req.body);
  console.log(newService);
  Service.updateOne({ service_id: req.body.service_id }, {
    service_name: req.body.service_name,
    business_name:  req.body.business_name,
    description: req.body.description,
    service_category: req.body.product_category,
    available_booking: req.body.available_booking,
    available_appoints: req.body.available_appoints,
    rating: req.body.rating,
    no_of_ratings: req.body.no_of_ratings,
    no_of_bookings: req.body.no_of_bookings,
    no_of_appoints: req.body.no_of_appoints,
    created_date: req.body.created_date,
    created_time: req.body.created_time,
    rate: req.body.rate,
    rate_type: req.body.rate_type,
    capacity: req.body.capacity,
    pay_on_meet: req.body.pay_on_meet,
    image_01: req.body.image_01,
    image_02: req.body.image_02,
    image_03: req.body.image_03,
    user_id: req.userData.user_id
  })
  .then(result=>{
    res.status(200).json({
      message: 'service updated successfully!',
      result: result
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: 'Service update was unsuccessfull! Please try Again!'
    });
  });
});


//remove a service
service.delete('/edit/:id',checkAuth, (req, res, next) => {
  Service.deleteOne({'service_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Service  deleted!" });
    }
  ).catch(err => {
    res.status(500).json({ message: "Service was not deleted! Please try again!" });
  })
});



// manage categories by admin

//add service category
service.post('/cat/add',checkAuth, (req, res, next) => {
  console.log(req.body);
  var cat = req.body;
  var newCategory = new ServiceCategories(cat);
  newCategory.save()
  .then(result => {
      res.status(200).json({
        message: 'service category added!',
      });
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error while adding service category!'
      });
    });
});


//remove a service category
service.post('/cat/remove',checkAuth, (req, res, next) => {
  ServiceCategories.deleteOne({'val': req.body.cat}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Service Category deleted!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "Error while removing Service Category!" });
  })
});




//search services
service.post('/search', (req, res, next) => {
  console.log(req.body);
  Service.aggregate([
                // step 1 : matching filters from service model
                {$match: {"service_category": req.body.category,
                "rate": {$gte: req.body.minPrice},
                "pay_on_meet":req.body.payOnMeet,
                "rating": {$gte: req.body.userRating},
                "available_booking": true}},
                // step 2 : joining possible bookings from Booking model
                {$lookup: {
                      from : "Booking",
                      localField : "service_id",
                      foreignField : "service_id",
                      as : "bookings"
                  }},
                // step 3: check booking possibilities
                {$match: {
                  "bookings.from_date": [{$lte:{ $toDate: req.body.fromDate}}], // not working
                  "bookings.to_date": [{$gte: { $toDate: req.body.toDate}}], // not working
                }}
              ])
  .then (finalResult => {
      res.status(200).json({
        message: 'services recieved successfully!',
        services: finalResult
      });
    })
    .catch( err =>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while recieving services! Please Retry!'
      });
    });
});


// check booking availability  !!!!! update with capacity
service.post('/booking/check', (req, res, next) => {
  req.body.fromDate = new Date(req.body.fromDate);
  req.body.toDate = new Date(req.body.toDate);
  console.log(req.body);
  Booking.find({ service_id: req.serviceId,
                    $or: [{from_date: { $gte :req.body.fromDate }}, // not working
                     {to_date: { $lte :req.body.toDate}}] // not working
                      })
                      .then( res => {
                        Service.findOne({service_id: req.body.serviceId, capacity: {$gte: res.length}})
  .then(result => {
    let availability = false;
    console.log(result);
    if (result.length){
      availability = true;
    }
      res.status(200).json({
        message: 'availability information recieved successfully!',
        availability: availability
      });
    });
  })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message: 'Error occured while checking for bookiing information!'
      });
    });
});

//add new booking
service.post('/booking/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqBooking = req.body;
  let serviceProviderId;

  // generate id
  Booking.find().select('booking_id').then( (bookings) => {
    if(bookings.length){
      lastid = bookings[bookings.length-1].booking_id;
    } else {
      lastid= 'B0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'B' + mId.toString();
    console.log(lastid);
    reqBooking['booking_id']= lastid; // last id

    // get service provider id and incrementing no_of_bookings
    Service.findOneAndUpdate({'service_id': req.body.service_id},{$inc : {'no_of_bookings':1} }).then( (recievedService) => {
    console.log(recievedService);
    serviceProviderId = recievedService.user_id
    // get customer name
    EventPlanner.findOne({'user_id': req.userData.user_id} ).then((recievedPlanner)=>{
        console.log(recievedPlanner);
        reqBooking.user = {
          'user_id':req.userData.user_id,
          'email': recievedPlanner.email,
          'name': recievedPlanner.first_name + ' ' + recievedPlanner.last_name
        }
        // get service Provider details
        Merchant.findOne({'user_id': serviceProviderId}).then( (recievedMerchant) => {
          reqBooking.serviceProvider = {
            'serviceProvider_id':serviceProviderId,
            'email': recievedMerchant.email,
            'name': recievedMerchant.first_name + ' ' + recievedMerchant.last_name
          };
          const mail= {
            email:recievedMerchant.email,
            subject: "New Booking on " + req.body.service_name,
            html: createHTML('Booking',req.body)
          };
          console.log(mail);
          const newBooking = new Booking(reqBooking);
          console.log(' final booking ', newBooking);
          // save booking
          newBooking.save().then(result => {
            sendMail(mail, () => {});
            res.status(200).json({
                message: 'Booking created successfully!',
                bookingId: result.booking_id // booking id as result
            });
          }).catch (err => {
            console.log('then 5', err);
            res.status(500).json({
              message: 'Error occured while creating Booking! Please Retry!'
            });
          });
      }).catch (err => {
      console.log('then 4 ', err);
      res.status(500).json({
        message: 'Error occured while creating Booking! Please Retry!'
      });
    });
    }).catch (err => {
      console.log('then 3 ', err);
      res.status(500).json({
        message: 'Error occured while creating Booking! Please Retry!'
      });
    }); // then 3
 }).catch (err => {
   console.log('then 2 ', err);
   res.status(500).json({
    message: 'Error occured while creating Booking! Please Retry!'
  });
 });
}).catch (err => {
  console.log('then 1 ', err);
  res.status(500).json({
   message: 'Error occured while creating Booking! Please Retry!'
 });
});
});


//add new calendar booking
service.post('/calbooking/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqBooking = req.body;
  // generate id
  Booking.find().select('booking_id').then( (bookings) => {
    if(bookings.length){
      lastid = bookings[bookings.length-1].booking_id;
    } else {
      lastid= 'B0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'B' + mId.toString();
    console.log(lastid);
    reqBooking['booking_id']= lastid; // last id
    // creating the user and service provider
    reqBooking['user'] = {user_id:'', email:'' ,name: ''};
    reqBooking['serviceProvider'] = {
      serviceProvider_id : req.userData.user_id,
      email: req.userData.email,
      name: null
    };

    // finalized booking
    const newBooking = new Booking(reqBooking);
    console.log(' final booking ', newBooking);

    // save booking
    newBooking.save().then(result => {
      res.status(200).json({
          message: 'Booking created successfully!',
          bookingId: result.booking_id // booking id as result
      });
    }).catch (err => {
      console.log('then 2 ', err);
      res.status(500).json({
        message: 'Error occured while creating Booking! Please Retry!'
      });
    });
  }).catch (err => {
    console.log('then 2 ', err);
    res.status(500).json({
      message: 'Error occured while creating Booking! Please Retry!'
    });
  });
});


// !!!!!!!!!! add aggrogate

//add new appointment
service.post('/appoint/add',checkAuth, (req, res, next) => {
  var lastid;
  let reqAppoint = req.body;
  let serviceProviderId;

  // generate id
  Appointment.find().select('appoint_id').then( (appoints) => {
    if(appoints.length){
      lastid = appoints[appoints.length-1].appoint_id;
    } else {
      lastid= 'A0';
    }
    let mId = +(lastid.slice(1));
    ++mId;
    lastid = 'A' + mId.toString();
    console.log(lastid);
    reqAppoint['appoint_id']= lastid; // last id

    // get service provider id and incrementing no_of_appoints
    Service.findOneAndUpdate({'service_id': req.body.service_id},{$inc : {'no_of_appoints':1} }).then ((recievedService) => {
      console.log(recievedService);
      serviceProviderId = recievedService.user_id; // serviceProvider id

    // get customer data
    EventPlanner.findOne({'user_id': req.userData.user_id}).then( (recievedPlanner) => {
      console.log(recievedPlanner);
      reqAppoint.user = {
        'user_id':req.userData.user_id,
        'email': recievedPlanner.email,
        'name': recievedPlanner.first_name + ' ' + recievedPlanner.last_name
      };

      // get serviceProvider data
      Merchant.findOne({'user_id': serviceProviderId}).then( (recievedMerchant) => {
          reqAppoint.serviceProvider = {
            'serviceProvider_id':serviceProviderId,
            'email': recievedMerchant.email,
            'name': recievedMerchant.first_name + ' ' + recievedMerchant.last_name
          }
         // creating mail
          const mail= {
            email:recievedMerchant.email,
            subject: "New Appointment on " + req.body.service_name,
            html: createHTML('Appointment',req.body)
          }
          console.log(mail);
          const newAppoint = new Appointment(reqAppoint);
          console.log(' final appointment ', newAppoint);

          // saving final appointment
          newAppoint.save().then(result => {
            sendMail(mail, () => {});
            res.status(200).json({
                message: 'Appointment created successfully!',
                appointId: result.appoint_id // booking id as result
            });
          }).catch (err => {
            console.log('then 5 ', err);
            res.status(500).json({
              message: 'Error occured while creating Appointment! Please Retry!'
            });
          });
         }).catch (err => {
          console.log('then 4 ', err);
          res.status(500).json({
            message: 'Error occured while creating Appointment! Please Retry!'
          });
        });
      }).catch (err => {
        console.log('then 3 ', err);
        res.status(500).json({
          message: 'Error occured while creating Appointment! Please Retry!'
        });
      });
    }).catch (err => {
      console.log('then 2 ', err);
      res.status(500).json({
        message: 'Error occured while creating Appointment! Please Retry!'
      });
    });
 }).catch (err => {
   console.log('then 1 ', err);
   res.status(500).json({
    message: 'Error occured while creating Appointment! Please Retry!'
  });
 });
});



// get methods


//get list of services
service.get('/get', (req, res, next) => {
  Service.find({available_booking: true},function (err, services) {
    console.log(services);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No matching Services Found! Please check your filters again!'}
        );
    });
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        services: services
      }
    );
  });
});

//get list of service provider only services
service.get('/get/sp',checkAuth, (req, res, next) => {
  Service.find({ user_id: req.userData.user_id },function (err, services) {
    delete services['user_id'];
    console.log(services);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No matching Services Found! Please try again!'}
        );
    });
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        services: services
      }
    );
  });
});

//get list of bookings
service.get('/booking/get',checkAuth, (req, res, next) => {
  Booking.find({state: 'pending'},function (err, bookings) {
    console.log(bookings);
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'No bookings Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'booking list recieved successfully!',
        bookings: bookings
      }
    );
  });
});


//get business locations
service.get('/location/get',checkAuth, (req, res, next) => {

  var query =  Merchant.find({business:{$ne : null}}).select(['business.location', 'business.title']);

  query.exec(function (err, locations) {
    console.log(locations);
    if (err) return handleError(err => {
      console.llog(err);
      res.status(500).json(
        { message: 'No locations Found!'}
        );
    });
    res.status(200).json(
      {
        message: 'locaion list recieved successfully!',
        locations: locations
      }
    );
  });
});

//get selected service
service.get('/get/:id', (req, res, next) => {

  Service.findOne({ service_id: req.params.id }, function (err,service) {
    if (err) return handleError(err => {
      res.status(500).json(
        { message: 'Error while loading service details! Please try another time!'}
        );
    });
    res.status(200).json(
      {
        message: 'Service recieved successfully!',
        service: service
      }
    );
  });
});

//get product categories
service.get('/cat', (req, res, next) => {

  ServiceCategories.find(function (err, categories) {
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
function createHTML(mailType,content) {
  if(mailType == 'Booking'){
    const message = "<h3> You have new "+ mailType + " on " + content.service_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.booking_id
    + "</b></h4><h4>Booked Date : <b> " +
   content.from_date.slice(0,10)
    + " </b></h4><h4>Duration : <b> " + content.duration + ' ' + content.rate_type.slice(1) + "(s) </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  } else if (mailType == 'Appointment'){
    const message = "<h3> You have new "+ mailType + " on " + content.service_name + "</h3><hr><h4>" + mailType + " ID : <b> " +
    content.appoint_id
    + "</b></h4><h4>Appointed Date : <b> " +
   content.appointed_date.slice(0,10)
    + " </b></h4><h4>Appointed Time : <b> " + content.appointed_date.slice(11,16) + " Hrs </b></h4><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
   return message;
  }

  }


module.exports = service;
