const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookingSchema = mongoose.Schema(
  {
    booking_id: {type: String, required: true, unique: true},
    service_id: {type: String, required: true},
    user_id: {type: String, required: true},
    event_id: {type: String, required: true},
    serviceProvider_id: {type: String, required: true},
    created_date: {type: String, required: true},
    state: {type: String, required: true},
    review:{type: String},
    from_date: {type: String, required: true},
    to_date: {type: String, required: true},
    duration: {type: Number, required: true},
    from_time: {type: String, required: true},
    to_time: {type: {hour: Number, minute: Number}, required: true},
    comment: {type: String},
    payment_type: {type: String, required: true},
    amount: {type: Number, required: true},
    commission_due: {type: Number, required: true},
    amount_paid: {type: Number, required: true},
  },
  { collection : 'Booking' }
);

bookingSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Booking', bookingSchema);

