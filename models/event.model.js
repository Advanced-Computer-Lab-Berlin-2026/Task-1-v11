const mongoose = require('mongoose');

const Category = Object.freeze({
  ACADEMIC: 'academic',
  SOCIAL: 'social',
  SPORTS: 'sports',
  CAREER: 'career',
  OTHER: 'other'
});

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide an event title"]
    },

    description: {
      type: String
    },

    date: {
      type: Date,
      required: [true, "Please provide an event date"]
    },

    location: {
      type: String,
      required: [true, "Please provide an event location"]
    },

    capacity: {
      type: Number,
      required: [true, "Please provide an event capacity"],
      min: [1, "Capacity must be at least 1"]
    },

    category: {
      type: String,
      enum: Object.values(Category),
      default: Category.OTHER
    },

    isFree: {
      type: Boolean,
      default: true
    },

    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

eventSchema.index(
  { title: 1, date: 1 },
  { unique: true }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;