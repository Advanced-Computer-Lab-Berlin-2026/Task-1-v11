const Event = require('../models/event.model.js');


const getEvents = async (req, res) => {
    try {
        const filter = {};

        if(req.query.category){
            filter.category = req.query.category;
        }
        if(req.query.isFree !== undefined){
            filter.isFree = req.query.isFree === 'true';
        }

        const events = await Event.find();
        res.status(200).json(events);

    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
const getUpcomingEvents = async (req, res) => {
    try{
        const events =  await Event.find({
            date:{$gte: new Date()}
        }).sort({ date: 1 });
        res.status(200).json(events);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const getEventById = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    }
    catch (error) {
        if(error.code === '11000'){
            res.status(409).json({ error: 'Duplicate event' });
        }
        if(error.name === 'ValidationError'){
            res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' + error.message });
    }
}

const updateEvent = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body)
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.status(200).json(event);
    }
    catch (error) {
        if(error.name === 'ValidationError'){
            res.status(400).json({ error: error.message });
        }
        if(error.code === '11000'){
            res.status(409).json({ error: 'Duplicate event' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const {id} = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getEvents,
    getUpcomingEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}