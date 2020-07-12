const mongoose = require ("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventsSchema = mongoose.Schema(
  {
    event_id:{type: String, required: true, unique: true},
    event_title: {type: String, required: true},
    description: {type: String },
    event_type: {type: String, required: true},
    event_category: {type: String, required: true},
    from_date: {type: Date, required: true},
    to_date: {type: Date, required: true},
    created_date: {type: String, required: true},
    location: {type: {
              lat: {type: Number, required: true},
              lang: {type: Number, required: true},
              homeTown: {type: String, required: true},
              }, required: true},
    no_of_participants: {type: Number, required: true},
    participants: {type:[{
                    participant_id: {type: String, required: true},
                    first_name: {type: String, required: true},
                    last_name: {type: String, required: true},
                    email: {type: String, required: true},
                    state: {type: Boolean, required: true},
                   }], required: true},
    total_budget: {type: Number, required: true},
    event_segments: {type: [{
                    segment_id: {type: String, required: true},
                    segment_type: {type: String, required: true},
                    segment_title: {type: String, required: true},
                    description:{type: String},
                    allocated_budget: {type: Number, required: true},
                    spent_budget: {type: Number, required: true},
                    state: {type: String, required: true},
                    sceduled_date: {type: String, required: true},
                    object: {type: Object, required: true},
                   }], required: true},
    service_categories: { type: [{
                          id: {type: String, required: true},
                          category: {type: String, required: true},
                          precentage: {type: Number, required: true},
                        }]},
    product_categories: { type: [{
                          id: {type: String, required: true},
                          category: {type: String, required: true},
                          precentage: {type: Number, required: true},
                       }]},
    feature_img: {type: String, required: true},
    qr_code: {type: String, required: true},
    state: {type: String, required: true},
    social_links: { type: {
                    fb: { type: String},
                    instagram: { type: String},
                    other: { type: String}
                  }},
    host: { type: {
            user_id: String,
            email: String,
            name: String
          }, required: true}
  },
  { collection : 'Event' }
);

eventsSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Event', eventsSchema );

