const Team = require("../models/team");

exports.getAllTeams = (req, res, next) => {
    Team.find()
        .then(teams => {
            res.status(200).json({
                message: 'all teams fetched',
                allTeams: teams
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getTeam = (req, res, next) => {
    const teamId = req.params.teamId;
}