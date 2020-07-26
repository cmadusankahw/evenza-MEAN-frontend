const mongoose = require ("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    _id: {type: mongoose.Schema.Types.ObjectId,
      auto: true},
    val: {type:String, required: true}
  },
  { collection : 'ProductCategories' }
);

module.exports = mongoose.model('ProductCategories', categoriesSchema);
