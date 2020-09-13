const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/all-users', userController.getAllUsers);

router.get('/all-members', userController.getAllMembers);

router.post('/add-user', userController.addNewUser);

router.post('/add-member', userController.addMember);

router.get('/get-member/:memberId', userController.getMember);

router.get('/get-team-members/:teamId', userController.getTeamMembers);

router.put('/edit-user/:userId', userController.updateUser);

router.put('/edit-member/:memberId', userController.updateMember);

router.put('/sumbit-user-info', userController.addUserInfo);

router.get('/:userId', userController.getUser);

module.exports = router;

//put -> update
//post -> add
