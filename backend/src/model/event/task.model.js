const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const taskSchema = mongoose.Schema(
  {
    task_id: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    sceduled_from_date: {type: String, required: true},
    sceduled_to_date: {type: String, required: true},
    state: { type: String, required: true}
  },
  { collection : 'Task' }
);

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Task', taskSchema );

