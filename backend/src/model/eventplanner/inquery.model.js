const mongoose = require ("mongoose");

const inquerySchema = mongoose.Schema(
  {
    id: {type: String, required: true},
    heading: {type: String, required: true},
    category: {type: String},
    message: {type: String},
    user_id: { type: String, required: true}
  },
  { collection : 'Inquery' }
);


module.exports = mongoose.model('Inquery', inquerySchema );

