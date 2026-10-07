const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
        title: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            min: 1,
            required: true
        },
        category: {
            type: String,
            enum: ['academic', 'social', 'sports', 'career', 'other'],
            default: 'other'
        },
        isFree: {
            type: Boolean,
            default: true
        },
        price: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    {
        timestamps: true
    }


);
eventSchema.index(
    {title: 1, date:1},
    {unique: true}
);
module.exports = mongoose.model('Event', eventSchema);