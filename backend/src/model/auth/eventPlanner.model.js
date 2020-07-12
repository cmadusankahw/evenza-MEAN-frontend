const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventPlannerSchema = mongoose.Schema(
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
    date_of_birth: {type: String},
    reg_date: {type: String, required: true}
  },
  { collection : 'EventPlanner' }
);

eventPlannerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('EventPlanner', eventPlannerSchema );

