const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const idVerifySchema = mongoose.Schema(
  {
    user_id: {type: String, required: true, unique: true},
    isverified: {type: Boolean , required: true},
    id_sideA: {type: String},
    id_sideB: {type: String},
    issuer: {type: String, required: true}
  },
  { collection : 'IDVerification' }
);


idVerifySchema.plugin(uniqueValidator);

module.exports = mongoose.model('IDVerification', idVerifySchema );

