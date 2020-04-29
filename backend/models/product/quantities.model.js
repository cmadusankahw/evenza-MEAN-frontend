const mongoose = require ("mongoose");

const quantitiesSchema = mongoose.Schema(
  {
    _id: {type: String},
    val: {type:String, required: true}
  },
  { collection : 'QuantityTypes' }
);

module.exports = mongoose.model('QuantityTypes', quantitiesSchema,'QuantityTypes' );
