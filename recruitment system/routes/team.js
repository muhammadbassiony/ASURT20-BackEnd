const path = require('path');
const express = require('express');

const teamController = require('../controllers/team');

const router = express.Router();

router.get('/all-teams', teamController.getAllTeams);

router.post('/add-team', teamController.addTeam);

router.post('/add-subteam/:teamId', teamController.addSubteam);

router.get('/:teamId', teamController.getTeam);

module.exports = router;

//put -> update
//post -> add