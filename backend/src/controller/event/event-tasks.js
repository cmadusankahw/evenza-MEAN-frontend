//model imports
const Event = require("../../model/event/event.model");
const checkAuth = require("../../middleware/auth-check");
const email = require("../common/mail");


//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron"); // running scheduled tasks

//express app declaration
const eventTasks = express();

//middleware
eventTasks.use(bodyParser.json());
eventTasks.use(bodyParser.urlencoded({ extended: false }));


// REST API

//  schedule a new task
eventTasks.post('/add',checkAuth, (req, res) => {
  Event.updateOne({'event_id': req.body.eventId}, {
  $push : {'event_segments.tasks' : req.body.task}
  }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "task created!" });
    }
  ).catch(() => {
    res.status(500).json({ message: "task creation failed Please try again!" });
  })
});

// edit a task
eventTasks.post('/edit',checkAuth, (req, res) => {
  Event.updateOne({'event_id': req.body.eventId}, {
  'event_segments.tasks' : req.body.tasks
  }).then(
    result => {
      console.log(result);
      res.status(200).json({ message: "tasks updated!" });
    }
  ).catch(() => {
    res.status(500).json({ message: "task update failed Please try again!" });
  })
});


// schedule task : send task reminder emails : checked in every hour
cron.schedule("59 1 * * *", function () {
  var today = new Date();

  Event.find().then( result => {
    // find and update confirmed participant state
    for (const  doct of result) {
      for ( let doc of doct.event_segments.tasks ) {
      // necessary date operations
      scheduledDate = new Date(doc.scheduled_from_date);
      var hours = Math.floor(-(today - scheduledDate) / 36e5);
      console.log ('Difference in hours :' ,hours);

      // date comparisons by hours
      if( hours> 0){
        if  (hours < 3) {
          const mail= {
            email:doct.host.email,
            subject: "Urgent: Reminder on scheduled task: " + doc.title + ' : Less than 3 hours Left!',
            html: createTaskHTML(doc.title,' less than 03 Hours', doc.scheduled_from_date)
          };
          // sending task reminder in email
          email.sendMail(mail, () => {});
        } else if (hours < 24) {
          const mail= {
            email:doct.host.email,
            subject: "Reminder on scheduled task: " + doc.title + ' : Less than a Day Left!',
            html: createTaskHTML(doc.title,' less than a Day', doc.scheduled_from_date)
          };
          // sending task reminder in email
          email.sendMail(mail, () => {});
        }
      };
    }
  }
  }).catch(err => {
    console.log(err);
  });
});


// create scheduled task reminder HTML
function createTaskHTML(task ,timeLess, taskDate) {
    const message = "<h3> You have a scheduled task:  "+ task + " on " + taskDate.slice(0,10) + " at " + taskDate.slice(11,16)+"</h3><hr>"
    + "<b> <h5> <strong> Task Due in: " + timeLess + "</strong></h5></b><hr><div class='text-center'><p><b> Please log in to view more details.<br><br><a class='btn btn-lg' href='evenza.biz//login'>Log In</a></b></p></div>"
    return message;
}

module.exports = eventTasks;
