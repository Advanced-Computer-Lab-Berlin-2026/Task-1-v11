
const mongoose = require('mongoose');
const Event = require('../models/event.model.js');

// Handle common database errors
function handleError(error, res) {
  if (error.code === 11000) {
    return res.status(409).json({
      message: 'An event with this title and date already exists'
    });
  }

  if (
    error.name === 'ValidationError' ||
    error.name === 'CastError'
  ) {
    return res.status(400).json({
      message: error.message
    });
  }

  return res.status(500).json({
    message: error.message
  });
}

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category !== undefined) {
      filter.category = req.query.category;
    }

    if (req.query.isFree !== undefined) {
      if (!['true', 'false'].includes(req.query.isFree)) {
        return res.status(400).json({
          message: 'isFree must be true or false'
        });
      }

      filter.isFree = req.query.isFree === 'true';
    }

    const events = await Event.find(filter);
    return res.status(200).json(events);

  } catch (error) {
    return handleError(error, res);
  }
};

// GET /api/events/upcoming
const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      date: { $gt: new Date() }
    }).sort({ date: 1 });

    return res.status(200).json(events);

  } catch (error) {
    return handleError(error, res);
  }
};

// GET /api/events/:id
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    return res.status(200).json(event);

  } catch (error) {
    return handleError(error, res);
  }
};

// POST /api/events
const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);

    return res.status(201).json(event);

  } catch (error) {
    return handleError(error, res);
  }
};

// PUT /api/events/:id
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    return res.status(200).json(event);

  } catch (error) {
    return handleError(error, res);
  }
};

// DELETE /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: 'Invalid event ID'
      });
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      });
    }

    return res.status(200).json({
      message: 'Event deleted successfully'
    });

  } catch (error) {
    return handleError(error, res);
  }
};

module.exports = {
  getEvents,
  getUpcomingEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
