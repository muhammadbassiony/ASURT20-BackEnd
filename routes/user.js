const path = require('path');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/all-users', userController.getAllUsers);

router.get('/:userId', userController.getUser);

router.post('/add-user', userController.addNewUser);


module.exports = router;

//put -> update
//post -> add