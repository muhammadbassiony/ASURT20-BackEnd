const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/all-users', userController.getAllUsers);

router.get('/get-user/:userId', userController.getUser);

router.get('/all-members', userController.getAllMembers);

router.post('/add-user', userController.addNewUser);

router.post('/add-member', userController.addMember);

router.get('/get-member/:memberId', userController.getMember);

router.get('/get-team-members/:teamId', userController.getTeamMembers);

router.put('/edit-user/:userId', userController.updateUser);

router.put('/edit-member/:memberId', userController.updateMember);

router.put('/sumbit-user-info/:userId', userController.addUserInfo);

router.delete('/delete-user/:userId', userController.deleteUser);

router.delete('/delete-member/:meberId', userController.deleteMember);

module.exports = router;

//put -> update
//post -> add
