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

exports.addMember = (req, res, next) => {
    const userId = req.body.userId;
    const teamId = req.body.teamId;
    const subteamId = req.body.subteamId;
    const isHead = req.body.head;

    const member = new Member({
        user: userId,
        team: teamId,
        subteam: subteamId,
        head: isHead
    })
    .save()
    .then(member => {
        res.status(201).json({
            message: 'member created',
            member: member
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getMember = (req, res, next) => {
    const memberId = req.params.memberId;
    Member.findById(memberId)
    .populate('user')
    .populate('team')
    .populate('subteam')
    .then(member => {
        if(!member){
            const error = new Error('Could not find member.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'member fetched',
            member: member
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getTeamMembers = (req, res, next) => {
    const teamId = req.params.teamId;
    Member.find({ team: teamId })
    .populate('user')
    .populate('team')
    .populate('subteam')
    .then(members => {
        res.status(200).json({
            message: 'team members fetched',
            members: members
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getAllMembers = (req, res, next) => {
    console.log("memberssss\n\n");
    Member.find()
    .populate('user')
    .populate('team')
    .populate('subteam')
    .then(members => {
        res.status(200).json({
            message: 'team members fetched',
            members: members
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

// exports.getHeads = (req, res, next) => {}

exports.updateUser = (req, res, next) => {}

exports.deleteUser = (req, res, next) => {}



