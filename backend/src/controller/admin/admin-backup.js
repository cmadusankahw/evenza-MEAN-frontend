//model imports
const path = require('path');


//dependency imports
const express = require("express");
const bodyParser = require("body-parser");
var backup = require('mongodb-backup');
var restore = require('mongodb-restore');
const cron = require("node-cron"); // running scheduled tasks
var exec = require('child_process').exec;

//express app declaration
const adminBackup = express();

//middleware
adminBackup.use(bodyParser.json());
adminBackup.use(bodyParser.urlencoded({ extended: false }));


// schedule auto backup functinality
cron.schedule("* * 28 * *", function () {

});


// create a backup
adminBackup.get('/create', (req, res, next) => {
 // create cloud atlas db backup
  exec('mongodump --uri="mongodb://admin:abcd1234@cluster0.xnfvc.gcp.mongodb.net/evenza" --out="' +  path.join(__dirname, 'database_backup_dump') + '"', function( err, success) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('success :', success);
    }
  });
  // backup local db
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
  });





});

// restore from  a backup
adminBackup.post('/restore', (req, res, next) => {
   // create cloud atlas db backup
   exec('mongorestore --db evenza ' +  path.join(__dirname, 'database_backup_dump') + '', function( err, success) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('success :', success);
    }
  });
  // restore local db backup
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

module.exports = adminBackup;
