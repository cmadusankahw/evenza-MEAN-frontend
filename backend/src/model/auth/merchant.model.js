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
    id_verification: {type: {
      isverified: Boolean,
      id_sideA: String,
      id_sideB: String,
      isuuer: String
      }, required: true},
    reg_date: {type: String, required: true},
    business: { type: {
      title: {type: String, required: true},
      description: {type: String},
      email: {type: String, required: true},
      contact_no: {type: String, required: true},
      address_line1: {type: String, required: true},
      address_line2: {type: String},
      postal_code: {type: String, required: true},
      created_date: {type: String, required: true},
      location: {type:{lat: Number, lang: Number, homeTown: String}, required: true},
      business_verification: {type: {business_isverified: Boolean,
                                     br_side_a: String,
                                     br_side_b: String}, required:true},
      open_days: {type: [{ day: Number,
                           isopened: Boolean,
                           from_time: Number,
                           to_time: Number }], required: true} ,
      payment_verified: {type: Boolean, required: true},
      card_details: { type: {name_on_card: String,
                             card_no: String,
                             cvc_no: String,
                             bank: String,
                             branch: String,
                             exp_month: String,
                             exp_year: String}},
      feature_img: {type: String, required: true},
      logo: {type: String, required: true}
    }}
  },
  { collection : 'Merchant' }
);

merchantSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Merchant', merchantSchema);

