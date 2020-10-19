const path = require('path');
const express = require('express');

const interviewsController = require('../controllers/interview');

const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/isAuth');

const router = express.Router();

router.post('/add-new-intrv', isAuth, isAdmin(2), interviewsController.newInterview);

router.get('/all-intrvs', isAuth, isAdmin(2), interviewsController.getAllInterviews);

router.get('/event-intrvs/:eventId', isAuth, isAdmin(2), interviewsController.getEventInterviews);

router.get('/get-intrv/:ivId', isAuth, interviewsController.getInterview);

router.get('/free-dates', isAuth, interviewsController.getAvailableDates);

router.put('/update-intrv/:ivId', isAuth, interviewsController.updateInterview);

router.delete('/delete-intrv/:ivId', isAuth, isAdmin(2), interviewsController.deleteInterview);

router.get('/app-intrvs/:appId', isAuth, interviewsController.getAppInterviews);

module.exports = router;