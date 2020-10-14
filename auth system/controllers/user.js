const User = require('../models/user');
const Member = require('../models/member');
const Team = require('../../recruitment system/models/team');
const Subteam = require('../../recruitment system/models/subteam');

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const team = require('../../recruitment system/models/team');

const currentSeason = '20-21'; 

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

exports.generateJWT = (id, level) => {
    return jwt.sign(
        { userId: id, level: level }, 
        process.env.JWT_SECRET, 
        { expiresIn: "2h" }
    );
}


exports.signUp = (req, res, next) => {
    const email = req.body.email;
    // const name = req.body.name;
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = new User({
        // name: name,
        email: email,
        password: hashedPassword
    })
    .save()
    .then(resUser => {
        const token = this.generateJWT(resUser._id, resUser.level);
        let authUser = {
            _id: resUser._id,
            level: resUser.level,
            token: token,
            profileComplete: resUser.profileComplete
        };

        res.status(201).json({
            message: 'Account created',
            // token: token
            user: authUser
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        const id = user._id.toString();
        const level = user.level;
        console.log('LOGIN USER :: \n', user, user.profileComplete);

        const hashedPassword = user.password;
        const doMatch = bcrypt.compareSync(password, hashedPassword);

        if (doMatch) {
            const token = this.generateJWT(id, level);
            let authUser = {
                _id: user._id,
                level: user.level,
                token: token,
                profileComplete: user.profileComplete
            };

            res.status(200).json({ 
                message: "Login successfully", 
                user: authUser
                // token: token 
            });

        } else error("Password is incorrect", 401, [{ email: email }]);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.addMember = (req, res, next) => {
    const userId = req.body.userId;
    const teamId = req.body.teamId;
    const subteamId = req.body.subteamId;
    const isHead = req.body.head;
    const season = req.body.season;

    let currentUser;
    let createdMember;

    const member = new Member({
        user: userId,
        team: teamId,
        subteam: subteamId,
        head: isHead,
        season: season
    });

    User.findById(userId)
    .then(user => {
        if(!user){
            const error = new Error('Could not find user.');
            error.statusCode = 404;
            throw error;
        }

        
        if(user.member && season == currentSeason){
            const error = new Error('This user is already registered as a member for this season!');
            error.statusCode = 406;
            throw error;
        }

        currentUser = user;

        return member.save();
    })
    .then(member => {
        createdMember = member;
        currentUser.member = member._id;
        
         return Team.findById(teamId);       
    })
    .then(team => {
        if(!team){
            const error = new Error('Could not find team.');
            error.statusCode = 404;
            throw error;
        }
        console.log(team.name, team.name == 'Managment');
        if(team.name == 'Managment'){
            calcLevel = isHead ? 3 : 2;
        } else {
            calcLevel = 1;
        }
        currentUser.level = calcLevel;

        return currentUser.save();   
    })
    .then(user => {
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
    const emergencyContact_mobile = req.body.emergencyContact_mobile;

    const profileComplete = req.body.profileComplete;

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
        user.profileComplete = profileComplete;

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



