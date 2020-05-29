const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const appointmntSchema = mongoose.Schema(
  {
    booking_id: {type: String, required: true, unique: true},
    service_id: {type: String, required: true},
    user_id: {type: String, required: true},
    event_id: {type: String, required: true},
    serviceProvider_id: {type: String, required: true},
    created_date: {type: String, required: true},
    state: {type: String, required: true},
    appointed_date: {type: String, required: true},
    appointed_time: {type: String, required: true},
    comment: {type: String},
  },
  { collection : 'Appointment' }
);

appointmntSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Appointment', appointmntSchema);

