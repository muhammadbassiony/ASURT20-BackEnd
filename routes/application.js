const path = require('path');
const express = require('express');

const applicationsController = require('../controllers/application');
//requests with multiple populates take a lot of time -- divide across multiple api calls?

const  extractCv = require('../middleware/pdf-files');

const router = express.Router();

router.post('/add-new-app', extractCv, applicationsController.newApp);

router.get('/all-apps', applicationsController.getAllApps); //why? - not implemented in front end

router.get('/get-app/:appId', applicationsController.getApp);

router.get('/user-apps/:userId', applicationsController.getUserApps);

router.get('/event-apps/:eventId', applicationsController.getEventApps);

router.get('/subteam-apps/:subteamId', applicationsController.getSubteamApps);

router.put('/update-app/:appId', applicationsController.updateApp);

router.get('/user-event-apps/:userId', applicationsController.getUserEvents);

router.post('/send-acc-mails/:eventId', applicationsController.sendAcceptedEmails);

router.post('/send-rej-mails/:eventId', applicationsController.sendRejectedEmails);

router.get('/event-csv/:eventId', applicationsController.exportCsv);

module.exports = router;