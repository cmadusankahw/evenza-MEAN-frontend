const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const usersSchema = mongoose.Schema(
  {
    user_id: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    user_type: {type:String, required: true},
    password: {type: String, required: true},
    state: {type: Boolean, required: true, default: false}
  },
  { collection : 'User' }
);

usersSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', usersSchema );

