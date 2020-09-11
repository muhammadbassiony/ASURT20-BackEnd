const User = require('../models/user');
const Member = require('../models/member');

exports.getAllUsers = (req, res, next) => {
    User.find()
    .then(users => {
        res.status(200).json({
            message: 'all users fetched',
            allUsers: users
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "user fetched!",
            user: user
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.addNewUser = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.userName;
    const password = req.body.password;

    const user = new User({
        name: name,
        email: email,
        password: password
    })
    .save()
    .then(resUser => {
        res.status(201).json({
            message: 'user created',
            user: resUser
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getTeamMembers = (req, res, next) => {}

// exports.getHeads = (req, res, next) => {}

exports.updateUser = (req, res, next) => {}

exports.addMember = (req, res, next) => {}

exports.deleteUser = (req, res, next) => {}



