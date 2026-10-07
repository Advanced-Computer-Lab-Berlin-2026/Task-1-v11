const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'please provide an Event title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'please provide an Event date'],
    },
    location: {
      type: String,
      required: [true, 'please provide an Event location'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'please provide a Capacity'],
      min: [1, 'Capacity must be at least 1'],
    },
    category: {
      type: String,
      enum: ['academic', 'social', 'sports', 'career', 'other'],
      default: 'other',
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      min: [0, 'Price cannot be negative'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ title: 1, date: 1 }, { unique: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;