//model imports
const Service = require("../../model/service/service.model");
const checkAuth = require("../../middleware/auth-check");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const multer = require ("multer");
const uploadImage = require('../../../helpers/helpers');

// express app imports
const serviceSearch = require("./service-search");
const serviceBooking = require("./service-booking");
const serviceAppoint = require("./service-appoint");
const servicePromotion = require("./service-promotion");
const serviceRating = require("./service-search");
const serviceCat = require("./service-cat");
const serviceLocation = require("./service-location");

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

// google cloud storage image uploads
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
})

//middleware
service.use(bodyParser.json());
service.use(bodyParser.urlencoded({ extended: false }));

// express app includes
service.use('/cat', serviceCat);
service.use('/booking', serviceBooking);
service.use('/appoint', serviceAppoint);
service.use('/rating', serviceRating);
service.use('/search', serviceSearch);
service.use('/promotion', servicePromotion);
service.use('/location', serviceLocation);

//add new service
service.post('/add',checkAuth, (req, res) => {
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
      if (err) return handleError(() => {
        res.status(500).json({
          message: 'Error occured while getting service ID details!'
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
      .catch((err)=>{
        console.log(err);
        res.status(500).json({
          message: 'Service creation was unsuccessfull! Please try Again!'
        });
      });
    });
});

// add service photos
service.post('/img/add',checkAuth, multerMid.array("images[]"), async (req, res, next) => {
  try {
    let imagePaths = [];
    for (let f of req.files) {
      imagePaths.push(await uploadImage(f));
    }
    console.log('uploaded to google cloud', imagePaths);
    res
      .status(200)
      .json({
        imagePaths: imagePaths
      });
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .json({
      message: "Upload was unsuccessful",
    });
  }
});

//edit service
service.post('/edit',checkAuth, (req, res) => {
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
  .catch(()=>{
    res.status(500).json({
      message: 'Service update was unsuccessfull! Please try Again!'
    });
  });
});


//remove a service
service.delete('/remove/:id',checkAuth, (req, res) => {
  Service.deleteOne({'service_id': req.params.id}).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "Service  deleted!" });
    }
  ).catch(() => {
    res.status(500).json({ message: "Service was not deleted! Please try again!" });
  })
});



//get list of services
service.get('/get', (req, res) => {
  Service.find({available_booking: true}).then( (services) => {
    console.log(services);
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        services: services
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No matching Services Found! Please check your filters again!'}
      );
  });
});

//get list of service provider only services to service provider's business profile
service.get('/get/sp',checkAuth, (req, res) => {
  Service.find({ user_id: req.userData.user_id }).then( (services) => {
    delete services['user_id'];
    console.log(services);
    res.status(200).json(
      {
        message: 'Product list recieved successfully!',
        services: services
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'No matching Services Found! Please try again!'}
      );
  })
});

//get selected service
service.get('/get/:id', (req, res) => {

  Service.findOne({ service_id: req.params.id }).then( (service) => {
    res.status(200).json(
      {
        message: 'Service recieved successfully!',
        service: service
      }
    );
  }).catch( err => {
    console.log(err);
    res.status(500).json(
      { message: 'Error while loading service details! Please try another time!'}
      );
  })
});

module.exports = service;
