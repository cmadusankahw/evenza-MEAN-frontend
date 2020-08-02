const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventCategoriesSchema = mongoose.Schema(
  {
    id: {type: String, required: true, unique: true},
    category: {type: String, required: true},
    img:{type: String},
    services: {type: [{
                id: { type: String, required: true},
                category: { type: String, required: true},
                precentage: { type: Number, required: true}
    }]},
    products:  {type: [{
                id: { type: String, required: true},
                category: { type: String, required: true},
                precentage: { type: Number, required: true}
    }]},
  },
  { collection : 'EventCategory' }
);

eventCategoriesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('EventCategory', eventCategoriesSchema );

