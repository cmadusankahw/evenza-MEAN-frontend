const mongoose = require ("mongoose");

const serviceSchema = mongoose.Schema(
  {
    service_id: {type: String, required: true, unique: true},
    service_name: {type: String, required: true},
    business_name: {type: String, required: true},
    description: {type: String},
    service_category: {type: String, required: true},
    available_booking: {type: Boolean, required: true, default: false},
    available_appoints: {type: Boolean, required: true, default: false},
    rating: {type: Number, required: true},
    no_of_ratings: {type: Number, required: true},
    no_of_bookings: {type: Number, required: true},
    no_of_appoints: {type: Number, required: true},
    created_date:{type: String, required: true},
    created_time:{type: String, required: true},
    rate: {type: Number, required: true},
    rate_type: {type: String, required: true},
    pay_on_meet:{type: Boolean, required: true, default: false},
    image_01: {type: String},
    image_02: {type: String},
    image_03: {type: String},
    user_id: {type: String, ref: "Merchant", required: true} // foreign key reference
  },
  { collection : 'Service' }
);

module.exports = mongoose.model('Service', serviceSchema);
