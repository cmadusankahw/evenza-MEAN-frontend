const mongoose = require ("mongoose");

const productSchema = mongoose.Schema(
  {
    product_id: {type: String, required: true, unique: true},
    business_name:  {type: String, required: true},
    product: {type: String, required: true},
    product_category: {type: String, required: true},
    qty_type: {type: String, required: true},
    product_category: { type: String, required: true},
    description: {type: String},
    created_date: {type: String, required: true},
    created_time: {type: String, required: true},
    availability: {type: Boolean, required: true, default: false},
    inventory: {type: Number, required: true},
    rating: {type: Number, default: 0},
    no_of_ratings: {type: Number, default: 0},
    no_of_orders: {type: Number, default: 0},
    delivery_service: {type: String, required: true},
    price: {type: Number, required: true, default:0.0},
    pay_on_delivery: {type: Boolean, required: true, default: false},
    image_01: {type: String},
    image_02: {type: String},
    image_03: {type: String},
    user_id: { type: String, ref: "Merchant", required: true} // foreign key reference
  },
  { collection : 'Product' }
);

module.exports = mongoose.model('Product', productSchema);
