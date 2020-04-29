const mongoose = require ("mongoose");

const paymentTypesSchema = mongoose.Schema(
  {
    _id: {type: String},
    val: {type:String, required: true}
  },
  { collection : 'PaymentTypes' }
);

module.exports = mongoose.model('PaymentTypes', paymentTypesSchema);
