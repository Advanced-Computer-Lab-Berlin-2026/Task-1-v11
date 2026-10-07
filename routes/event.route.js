const express = require('express');
const Event = require('../models/event.model.js');
const router = express.Router();
const eventController = require('../controllers/event.controller.js');

router.get('/', eventController.getEvents)
router.get('/:upcoming', eventController.getUpcomingEvents)
router.get('/:id', eventController.getEventById)
router.post('/', eventController.createEvent)
router.put('/:id', eventController.updateEvent)
router.delete('/:id', eventController.deleteEvent)

module.exports = router;