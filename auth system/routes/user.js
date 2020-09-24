const path = require('path');
const express = require('express');
const { body } = require("express-validator");

const userController = require('../controllers/user');

const validate = require("../../middleware/validate");

const User = require('../models/user');
const Member = require('../models/member');

const router = express.Router();

router.get('/all-users', userController.getAllUsers);

router.get('/get-user/:userId', userController.getUser);

router.get('/all-members', userController.getAllMembers);

// router.post('/add-user', userController.addNewUser);

router.post('/add-member', userController.addMember);

router.get('/get-member/:memberId', userController.getMember);

router.get('/get-team-members/:teamId', userController.getTeamMembers);

router.put('/edit-user/:userId', userController.updateUser);

router.put('/edit-member/:memberId', userController.updateMember);

router.put('/sumbit-user-info/:userId', userController.addUserInfo);

router.delete('/delete-user/:userId', userController.deleteUser);

router.delete('/delete-member/:meberId', userController.deleteMember);

router.post(
    "/signup",
    [
        body("email")
            .isEmail()
            .trim()
            .normalizeEmail()
            .withMessage("Invalid email")
            .bail()
            .custom((email) => {
                return User.findOne({ email: email }).then((doc) => {
                    if (doc) throw new Error("Email already exists");
                    return true;
                });
            }),
        body("name")
            .isLength({ min: 3 })
            .withMessage("Name must be at least 3 characters")
            .escape(),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    ],
    validate(),
    userController.addNewUser
);

router.post(
    "/login",
    [
        body("email")
            .isEmail()
            .trim()
            .normalizeEmail()
            .bail()
            .withMessage("Invalid email")
            .custom((email) => {
                return User.findOne({ email: email }).then((doc) => {
                    if (!doc) throw new Error("Email doesn't exists");
                    return true;
                });
            }),
    ],
    validate(),
    userController.login
);

module.exports = router;

//put -> update
//post -> add
