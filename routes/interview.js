const path = require('path');
const express = require('express');

const interviewsController = require('../controllers/interview');

const router = express.Router();

router.post('/add-new-intrv', interviewsController.newInterview);

router.get('/all-intrvs', interviewsController.getAllInterviews);

router.get('/get-intrv/:ivId', interviewsController.getInterview);

router.get('/free-dates', interviewsController.getAvailableDates);

router.put('/update-intrv/:ivId', interviewsController.updateInterview);

router.delete('/delete-intrv/:ivId', interviewsController.deleteInterview);

module.exports = router;