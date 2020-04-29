const mongoose = require ("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    _id: {type: String},
    val: {type:String, required: true}
  },
  { collection : 'ProductCategories' }
);

module.exports = mongoose.model('ProductCategories', categoriesSchema);
