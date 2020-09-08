const path = require('path');
const express = require('express');

const teamController = require('../controllers/team');

const router = express.Router();

router.get('/teams', teamController.getAllTeams);

router.get('/team/:teamId', teamController.getTeam);


module.exports = router;