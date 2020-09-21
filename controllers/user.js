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
    // console.log("memberssss\n\n");
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

exports.updateUser = (req, res, next) => {
    const userId = req.params.userId;
    const email = req.body.email;
    const name = req.body.userName;
    const password = req.body.password;

    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        }

        user.email = email;
        user.name = name;
        user.password = password;

        return user.save();
    })
    .then(user => {
        res.status(200).json({
            message: "user updated!",
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

exports.updateMember = (req, res, next) => {
    const memberId = req.params.memberId;
    const userId = req.body.userId;
    const teamId = req.body.teamId;
    const subteamId = req.body.subteamId;
    const isHead = req.body.head;

    Member.findById(memberId)
    .then(member => {
        if(!member){
            const error = new Error('Could not find member.');
            error.statusCode = 404;
            throw error;
        }

        member.team = teamId;
        member.subteam = subteamId;
        member.head = isHead;
        
        return member.save();
    })
    .then(member => {
        res.status(200).json({
            message: "member updated!",
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


exports.addUserInfo = (req, res, next) => {
    const userId = req.params.userId;
    
    const email = req.body.email;
    const name = req.body.userName;
    const password = req.body.password;

    const university = req.body.university;
    const mobile = req.body.mobile;
    const gender = req.body.gender;
    const birthdate = new Date(req.body.birthdate);
    const department = req.body.department;
    const faculty = req.body.faculty;
    const credit = req.body.credit;
    const graduationYear = req.body.graduationYear;
    const collegeId = req.body.collegeId;

    const emergencyContact_name = req.body.emergencyContact_name;
    const emergencyContact_relation = req.body.emergencyContact_relation;
    const emergencyContact_mobile = req.body.emergencyContact_mobile 

    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        }

        user.email = email;
        user.name = name;
        user.password = password;

        user.university = university;
        user.mobile = mobile;
        user.gender = gender;
        user.birthDate = birthdate;
        user.department = department;
        user.faculty = faculty;
        user.credit = credit;
        user.graduationYear = graduationYear;
        user.collegeId = collegeId;

        user.emergencyContact_name = emergencyContact_name;
        user.emergencyContact_mobile = emergencyContact_mobile;
        user.emergencyContact_relation = emergencyContact_relation;

        return user.save();
    })
    .then(user => {
        res.status(200).json({
            message: "user updated!",
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

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        }

        return User.findByIdAndDelete(userId);
    })
    .then(res => {
        res.status(200).json({
            message: "user deleted!"
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteMember = (req, res, next) => {
    const memberId = req.params.memberId;
    
    Member.findById(memberId)
    .then(member => {
        if(!member){
            const error = new Error('Could not find member.');
            error.statusCode = 404;
            throw error;
        }

        return Member.findByIdAndDelete(memberId);
    })
    .then(res => {
        res.status(200).json({
            message: "member deleted!"
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}



