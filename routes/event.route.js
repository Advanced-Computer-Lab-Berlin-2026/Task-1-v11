const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller.js');

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/:id', eventController.getEventById);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;