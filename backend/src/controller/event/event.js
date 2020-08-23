//model imports
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");
const mailHeader = require("../common/mail-header");
const mailFooter = require("../common/mail-footer");
const fs = require("fs");
const path = require('path');

// express app imports
const eventAlerts = require("./event-alerts");
const eventPlan = require("./event-plan");
const eventParticipants = require("./event-participants");
const eventCat = require("./event-cat");
const eventImg = require("./event-img");
const eventTasks = require("./event-tasks");
const eventOpen = require("./event-open");

//dependency imports
const express = require("express");
const bodyParser = require("body-parser");

//express app declaration
const event = express();

//middleware
event.use(bodyParser.json());
event.use(bodyParser.urlencoded({ extended: false }));

// express app includes
event.use('/alerts', eventAlerts);
event.use('/cat', eventCat);
event.use('/plan', eventPlan);
event.use('/img', eventImg);
event.use('/tasks', eventTasks);
event.use('/participants', eventParticipants);
event.use('/open', eventOpen);

// REST API

//add new event
event.post('/add',checkAuth, (req, res) => {
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



//get list of events for event cards
event.get('/get',checkAuth, (req, res) => {

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
 event.get('/get/:id', (req, res) => {

   Event.findOne({ event_id: req.params.id }).then ((event) => {
     res.status(200).json(
       {
         message: 'event recieved successfully!',
         event: event
       }
     );
   }).catch( err => {
     console.log(err);
     res.status(500).json(
      { message: 'Error while loading event Details! Please try another time!'}
      );
   })
 });

// update an event
event.post('/edit',checkAuth, (req, res) => {
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
  ).catch(() => {
    res.status(500).json({ message: "event details update failed Please try again!" });
  })
});


//cancel an event
event.post('/remove',checkAuth, (req, res) => {
  Event.findOneAndUpdate({'event_id': req.body.eventId}, {
    state: 'cancelled'
  }).then(
    result => {
      console.log(result);
      pars = result.participants.participants;
      console.log('event participants: ',pars);
      // sending cancellation mails to participants
      for (const  doc of pars) {
        const mail= {
          email:doc.email,
          subject: 'Cancellation Notice: '+ result.event_title,
          html: createCancelHTML(result.event_title,result.from_date.toISOString(),result.to_date.toISOString())
        };
        console.log( 'new Mail:' , mail);
        email.sendMail(mail, () => {});
      }
      res.status(200).json({ message: "event was cancelled! All participants were informed!" });
    }
  ).catch((err) => {
    console.log(err);
    res.status(500).json({ message: "cancel request failed Please try again!" });
  })
});


// update tasks list when closing the component ( need to add service, product mgmt also)
event.get('/publish/:id',checkAuth, (req, res) => {
  console.log(req.body);
  // add updating services, products lists as well
  Event.findOne({event_id: req.params.id}).then( result => {

      pars = result.participants.participants;
      console.log('recieved participants: ',pars);
      // sending mails to participants
      for (const  doc of pars) {
        var mail;
        if ( result.event_type == 'closed' && doc.state != 'accepted') {
          mail= {
            email:doc.email,
            subject: result.alerts[0].heading,
            html: createHTML(result.alerts[0].message,doc.participant_id,req.params.id)
          };
          console.log( 'new closed Mail:' , mail);
          email.sendMail(mail, () => {});
          const index = pars.indexOf(doc);
          pars[index].state = "invited";

        }
      }
      // finally update the modified event
      Event.updateOne({event_id: req.params.id},{
        'state': "published",
        'participants.participants': pars,
      }).then( (updatedResult) => {
        console.log(updatedResult);
        res.status(200).json( {message: "Event Publish was Successfull!"} );
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
event.get('/confirm/:id', (req, res) => {
  var idS = req.params.id.split('_');
  console.log(idS);
  var pars;
  var approvedParticipants = 0;

  Event.findOne({event_id: idS[1]}).then( result => {
    pars = result.participants.participants;
    approvedParticipants = +(result.participants.approved_participants);
    console.log('recieved participants: ',pars);
    // find and update confirmed participant state
    for (const  doc of pars) {
     if( doc.participant_id == idS[0]){
      const index = pars.indexOf(doc);
      if (pars[index].state != "accepted") {
        pars[index].state = "accepted";
        approvedParticipants++;
      }

     }
    };
    Event.updateOne({event_id: idS[1]},{
      'participants.participants': pars,
       'participants.approved_participants' : approvedParticipants
    }).then( (updatedResult) => {
      console.log(updatedResult);
      fs.readFile(path.join(__dirname, 'confirm/confirm.html'), null, function (err, data) {
        if (err) {
          console.log(err);
          res.writeHead(404);
          res.write('Something went Wrong!');
        } else {
          res.writeHead(200);
          res.write(data);
        }
        res.end();
      })
    }).catch( err => {
      console.log(err);
      res.status(500).json({ message: "Confirmation Unsuccessful! Please try again!"});
     });
  }).catch( err => {
    console.log(err);
    res.status(500).json({ message: "Confirmation Unsuccessful! Please try again!" });
   });
  });



// create event invitation HTML with confirmation link
function createHTML(content, pid, eventId) {
   const message =  mailHeader.mailHeader + "<h3> Invitation </h3><br> Dear Sir/Madam, <br><br>" + content
   +"<br><br> Click below link to confirm your participation:<hr> <b> <a href='https://evenza-backend-project.df.r.appspot.com/api/event/confirm/"+ pid + '_' + eventId + "' target='_blank'> Conirm My Participation</a></br>"
   + "<div> <hr> Thank You, <br> Your Sincere, <br><br> Event Organizer at Evenza</div>" + mailFooter.mailFooter
   return message;
  }
  //


    // create cancelrequest HTML
function createCancelHTML(eventTitle, fromDate, toDate) {
  const message =  mailHeader.mailHeader + "<h3> Cancellation Notice! </h3><br> Dear Sir/Madam,"
  +"<br><br> <b> The Event : "+ eventTitle +"</b> which is to be held from " + fromDate.slice(0,10) + " to "+  toDate.slice(0,10) + " , was cancelled due to an unavoidable reason."  + "<br><br>"
  + "<div> <hr> Thank You for your understanding,,<br> <br> Your Sincere, <br><br> Event Organizer at Evenza</div>"  + mailFooter.mailFooter
  return message;
 }


module.exports = event;
