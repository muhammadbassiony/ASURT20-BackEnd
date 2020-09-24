const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const User = require("../models/users");
const usersController = require("../controllers/users");
const validate = require("../../middleware/validate");

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
    usersController.signUp
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
    usersController.login
);

module.exports = router;
