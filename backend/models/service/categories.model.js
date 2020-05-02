const mongoose = require ("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    _id: {type: String},
    val: {type:String, required: true}
  },
  { collection : 'ServiceCategories' }
);

module.exports = mongoose.model('ServiceCategories', categoriesSchema);
