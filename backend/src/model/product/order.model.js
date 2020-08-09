const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const orderSchema = mongoose.Schema(
  {
    order_id: {type: String, required: true, unique: true},
    product_id: {type: String, required: true},
    product: {type: String, required: true},
    event_id: {type: String, required: true},
    qty_type: {type: String, required: true},
    business_name: {type: String, required: true},
    delivery_address: {type: String, required: true},
    created_date: {type: Date, required: true},
    state: {type: String, required: true},
    review:{type: String},
    quantity: {type: Number, required: true},
    comment: {type: String},
    amount: {type: Number, required: true},
    commission_due: {type: Number, required: true},
    amount_paid: {type: Number, required: true},
    delivery_service: { type: {
      delivery_service: String,
      title: String,
      email: String,
      address: String,
      hotline: String,
      delivery_rate: Number,
      min_delivery_time: Number,
      max_delivery_time: Number,
    }, required: true },
    seller: {type: {seller_id: String,
                    email:String,
                    name: String}, required: true},
    user: {type: {user_id: String,
                  email: String,
                  name: String}, required: true},
  },
  { collection : 'Order' }
);


orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Order', orderSchema);

