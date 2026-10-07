const Event = require('../models/event.model.js');

const createEvent = async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.date ||
            !req.body.location ||
            req.body.capacity === undefined ) {
                return res.status(400).json({ error: 'Missing required fields' });
        }

        let eventBody = {
            title: req.body.title,
            date: req.body.date,
            location: req.body.location,
            capacity: req.body.capacity,
            description: req.body.description || '',
        }
        const event = await Event.create(eventBody);
        res.status(201).json(event);
    } catch (error) {
        if (error.code === '11000') {
            res.status(409).json({ error: 'Duplicate Key Error' + error.message });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ error: messages });
        }
        else {
            res.status(500).json({ error: 'Internal server error' + error.message });
        }
    }
};

const getAllEvents = async (req, res) => {
    const {isFree, category} = req.query;
    try {
        let events;
        if (isFree !== undefined && category !== undefined) {
            events = await Event.find({ isFree: isFree, category: category });
        } else if (isFree !== undefined) {
            events = await Event.find({ isFree: isFree });
        } else if (category !== undefined) {
            events = await Event.find({ category: category });
        } else {
            events = await Event.find();
        }
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' + error.message });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' + error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        if (error.code === '11000') {
            res.status(409).json({ error: 'Duplicate Key Error' + error.message });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.status(400).json({ error: messages });
        } else {
            res.status(500).json({ error: 'Internal server error' + error.message });
        }
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' + error.message });
    }
};

const getUpcomingEvents = async (req, res) => {
    try {
        const currentDate = new Date();
        const upcomingEvents = await Event.find({ date: { $gte: currentDate } }).sort({ date: 1 });
        res.status(200).json(upcomingEvents);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' + error.message });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    getUpcomingEvents
};