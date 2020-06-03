const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookingSchema = mongoose.Schema(
  {
    booking_id: {type: String, required: true, unique: true},
    service_id: {type: String, required: true},
    event_id: {type: String, required: true},
    service_name: {type: String, required: true},
    event_name: {type: String, required: true},
    business_name: {type: String, required: true},
    rate_type: {type: String, required: true},
    created_date: {type: String, required: true},
    state: {type: String, required: true},
    review:{type: String},
    from_date: {type: String, required: true},
    to_date: {type: String, required: true},
    duration: {type: Number, required: true},
    from_time: {type: {hour: Number, minute: Number, second: Number}, required: true},
    to_time: {type: {hour: Number, minute: Number, second: Number}, required: true},
    comment: {type: String},
    amount: {type: Number, required: true},
    commission_due: {type: Number, required: true},
    amount_paid: {type: Number, required: true},
    serviceProvider: {type: {serviceProvider_id: String,
                             email: String,
                             name: String}, required: true},
    user: {type: {user_id: String,
                  email: String,
                  name: String}, required: true},
  },
  { collection : 'Booking' }
);

bookingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Booking', bookingSchema);

