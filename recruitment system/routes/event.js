const path = require('path');
const express = require('express');

const eventsController = require('../controllers/event');

const router = express.Router();

router.get('/all-events', eventsController.getAllEvents);

router.get('/get-event/:eventId', eventsController.getEvent);

router.post('/add-event', eventsController.addNewEvent);

router.put('/update-event/:eventId', eventsController.updateEvent);

router.put('/edit-event-status/:eventId', eventsController.toggleEventStatus);

router.put('/increment-event-applicants/:eventId', eventsController.incrementNumApplicants);

router.put('/increment-num-acc/:eventId', eventsController.incrementNumAccepted);

router.put('/increment-num-rej/:eventId', eventsController.incrementNumRejected);

router.put('/increment-num-pendacc/:eventId', eventsController.incrementNumPendAcc);

router.put('/increment-num-pendrej/:eventId', eventsController.incrementNumPendRej);

// TODO :: EVENT DELETION

module.exports = router;

//put -> update
//post -> add