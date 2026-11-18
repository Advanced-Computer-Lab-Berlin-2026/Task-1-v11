
const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event.controller.js');

router.get('/', eventController.getEvents);

// Must come before /:id
router.get('/upcoming', eventController.getUpcomingEvents);

router.get('/:id', eventController.getEventById);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
