const path = require('path');
const express = require('express');

const applicationsController = require('../controllers/application');

const router = express.Router();

router.get('/all-apps', applicationsController.getAllApps);

// router.get('/get-app/:appId', applicationsController.getApp);

router.post('/add-app', applicationsController.addNewApp);

// router.get('/user-apps/:userId', applicationsController.getUserApps);

// router.get('/event-apps/:eventId', applicationsController.getEventApps);

// router.get('/subteam-apps/:subteamId', applicationsController.getSubteamApps);


module.exports = router;