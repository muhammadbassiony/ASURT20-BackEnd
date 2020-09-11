const path = require('path');
const express = require('express');

const eventsController = require('../controllers/event');

const router = express.Router();

router.get('/all-events', eventsController.getAllEvents);

router.get('/get-event/:eventId', eventsController.getEvent);

router.post('/add-event', eventsController.addNewEvent);

module.exports = router;

//put -> update
//post -> add