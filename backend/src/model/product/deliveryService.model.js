const mongoose = require ("mongoose");

const deliveryServiceSchema = mongoose.Schema(
  {
    delivery_service: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    address: {type: String, required: true},
    hotline: {type: String, required: true},
    delivery_rate: {type: Number, required: true},
    min_delivery_time: {type: Number, required: true},
    max_delivery_time: {type: Number, required: true},
  },
  { collection : 'DeliveryService' }
);

module.exports = mongoose.model('DeliveryService', deliveryServiceSchema,'DeliveryService' );
