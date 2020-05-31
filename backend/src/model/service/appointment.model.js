const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const appointmntSchema = mongoose.Schema(
  {
    appoint_id: {type: String, required: true, unique: true},
    service_id: {type: String, required: true},
    event_id: {type: String, required: true},
    created_date: {type: String, required: true},
    state: {type: String, required: true},
    appointed_date: {type: String, required: true},
    appointed_time: {type: {hour: Number, minute: Number, second: Number}, required: true},
    comment: {type: String},
    serviceProvider_id: {type: String, required: true},
    user_id: {type: String, required: true},
  },
  { collection : 'Appointment' }
);

appointmntSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Appointment', appointmntSchema);

