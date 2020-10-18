const path = require('path');
const express = require('express');
const { body } = require("express-validator");

const userController = require('../controllers/user');

const validate = require("../../middleware/validate");
const isAdmin = require('../../middleware/isAdmin');
const isAuth = require('../../middleware/isAuth');

const User = require('../models/user');
const Member = require('../models/member');

const router = express.Router();


router.get('/all-users', isAuth, isAdmin(2), userController.getAllUsers);

router.get('/get-user/:userId', isAuth, isAdmin(2), userController.getUser);

router.get('/all-members', isAuth, isAdmin(2), userController.getAllMembers);

// router.post('/signup', userController.signUp);

router.post('/add-member', isAuth, isAdmin(2), userController.addMember);

router.get('/get-member/:memberId', isAuth, isAdmin(2), userController.getMember);

router.get('/get-team-members/:teamId', isAuth, isAdmin(2), userController.getTeamMembers);

router.put('/edit-user/:userId', isAuth, userController.updateUser);

router.put('/edit-member/:memberId', isAuth, isAdmin(2), userController.updateMember);

router.put('/sumbit-user-info/:userId', isAuth, userController.addUserInfo);

router.delete('/delete-user/:userId', isAuth, isAdmin(2), userController.deleteUser);

router.delete('/delete-member/:meberId', isAuth, isAdmin(2), userController.deleteMember);

router.put('/req-reset-password', userController.requestPasswordReset);

// router.post('/new-password', AuthCtrl.NewPassword);
// router.post('/valid-password-token', AuthCtrl.ValidPasswordToken);

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
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    ],
    validate(),
    userController.signUp
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
