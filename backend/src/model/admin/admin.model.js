const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema(
  {
    user_id: {type: String, required: true, unique: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    profile_pic: {type: String},
    email: {type: String, required: true, unique: true},
    contact_no: {type: String, required: true},
    address_line1: {type: String},
    address_line2: {type: String},
    postal_code: {type: String},
    gender: {type: String, required: true, default: 'none'},
    card_details: { type: {name_on_card: String,
      card_no: String,
      cvc_no: String,
      bank: String,
      branch: String,
      exp_month: String,
      exp_year: String}},
    payment_details: [{
        user_id: {type: String, required: true},
        user_type: {type: String, required: true},
        pays: [{
          timestamp: {type: { year:{type: Number, required: true},
                              month: {type: Number, required: true},
                    }, required: true},
          paid_date: {type: Date, required: true},
          paid_amount: {type: Number, required: true},
          due_amount: {type: Number, required: true},
        }]
    }]
  },
  { collection : 'Admin' }
);

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', adminSchema );

