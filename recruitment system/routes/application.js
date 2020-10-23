const path = require('path');
const express = require('express');

const validate = require("../../middleware/validate");
const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/isAuth');

const applicationsController = require('../controllers/application');
//requests with multiple populates take a lot of time -- divide across multiple api calls?

const  extractCv = require('../../middleware/pdf-files');

const router = express.Router();

router.post('/add-new-app',  isAuth, extractCv, applicationsController.newApp);

router.get('/all-apps', isAuth, isAdmin(2), applicationsController.getAllApps); //why? - not implemented in front end

router.get('/get-app/:appId',  isAuth, isAdmin(2), applicationsController.getApp);

router.get('/user-apps/:userId',  isAuth, isAdmin(0), applicationsController.getUserApps);

router.get('/event-apps/:eventId',  isAuth, isAdmin(2), applicationsController.getEventApps);

router.get('/subteam-apps/:subteamId',  isAuth, isAdmin(2), applicationsController.getSubteamApps);

router.put('/update-app/:appId',  isAuth, isAdmin(2), applicationsController.updateApp);

router.get('/user-event-apps/:userId',  isAuth, applicationsController.getUserEvents);

router.post('/send-acc-mails/:eventId',  isAuth, isAdmin(3), applicationsController.sendAcceptedEmails);

router.post('/send-rej-mails/:eventId',  isAuth, isAdmin(3), applicationsController.sendRejectedEmails);

router.get('/event-csv/:eventId', applicationsController.exportCsv);

module.exports = router;