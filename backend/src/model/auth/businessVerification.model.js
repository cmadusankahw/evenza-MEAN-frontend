const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const businessVerifySchema = mongoose.Schema(
  {
    user_id: {type: String, required: true, unique: true},
    business_isverified: {type: Boolean , required: true},
    br_side_a: {type: String},
    br_side_b:  {type: String}
  },
  { collection : 'BusinesseVrification' }
);

businessVerifySchema.plugin(uniqueValidator);

module.exports = mongoose.model('BusinesseVrification', businessVerifySchema );

