const path = require('path');
const express = require('express');

const teamController = require('../controllers/team');

const router = express.Router();

router.get('/teams', teamController.getAllTeams);

router.get('/:teamId', teamController.getTeam);

router.post('/add-team', teamController.addTeam);

router.post('/add-subteam/:teamId', teamController.addSubteam);

module.exports = router;

//put -> update
//post -> add