const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const appointmntSchema = mongoose.Schema(
  {
    appoint_id: {type: String, required: true, unique: true},
    service_id: {type: String, required: true},
    event_id: {type: String, required: true},
    service_name: {type: String, required: true},
    service_category: {type: String, required: true},
    event_name: {type: String, required: true},
    business_name: {type: String, required: true},
    created_date: {type: String, required: true},
    state: {type: String, required: true},
    appointed_date: {type: String, required: true},
    comment: {type: String},
    serviceProvider: {type: {serviceProvider_id: String,
                            email: String,
                            name: String}, required: true},
    user: {type: {user_id: String,
                  email: String,
                  name: String}, required: true},
  },
  { collection : 'Appointment' }
);

appointmntSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Appointment', appointmntSchema);

