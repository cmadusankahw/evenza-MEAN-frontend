const mongoose = require ("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    _id: {type: mongoose.Schema.Types.ObjectId,
      auto: true},
    val: {type:String, required: true}
  },
  { collection : 'ServiceCategories' }
);

module.exports = mongoose.model('ServiceCategories', categoriesSchema);
