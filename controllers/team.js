const Team = require("../models/team");
const Subteam = require('../models/subteam');

exports.getAllTeams = (req, res, next) => {
    Team.find()
        .then(teams => {
            res.status(200).json({
                message: 'all teams fetched',
                allTeams: teams
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    Team.findById(teamId)
    .then(team => {
        if (!team) {
            const error = new Error('Could not find team.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Team fetched.', team: team });
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
}

exports.addTeam = (req, res, next) => {
    const teamId = req.params.teamId;
    const name = req.body.teamName;
    const subteams = [];

    const team = new Team({
        name:  name
    })
    .save()
    .then(result => {
        res.status(201).json({
            message: "team added",
            team: result
        });
        // console.log(result);
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
}

exports.addSubteam = (req, res, next) => {
    const teamId = req.params.teamId;
    const name = req.body.subteamName;
    const subteam = new Subteam({ 
        name: name
    });

    subteam.save()
    .then(sub => {
        // console.log('sub::', sub);
        return Team.findByIdAndUpdate(
            teamId,
            { "$push": { subteams: sub._id } },
            { "new": true }
        );
    })
    .then(team => {
        if(!team){
            const error = new Error('Could not find team.');
            error.statusCode = 404;
            throw error;
        }
        // console.log('updated team?:: ', team);
        res.status(201).json({
            message: "subteam added",
            team: team
        });
    })
    .catch(err => {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
        next(err);
    });
}

