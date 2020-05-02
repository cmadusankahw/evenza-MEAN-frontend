const mongoose = require ("mongoose");

const ratesSchema = mongoose.Schema(
  {
    _id: {type: String},
    val: {type:String, required: true}
  },
  { collection : 'ServiceRates' }
);

module.exports = mongoose.model('ServiceRates', ratesSchema);
