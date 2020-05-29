const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const merchantSchema = mongoose.Schema(
  {
    user_id: {type: String, required: true, unique: true},
    user_type: {type: String, required: true},
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    profile_pic: {type: String},
    nic: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    contact_no: {type: String, required: true},
    address_line1: {type: String, required: true},
    address_line2: {type: String},
    postal_code: {type: String},
    gender: {type: String, required: true, default: 'none'},
    date_of_birth: {type: String},
    isverified: {type: Boolean, required: true},
    reg_date: {type: String, required: true}
  },
  { collection : 'Merchant' }
);

merchantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Merchant', merchantSchema);

