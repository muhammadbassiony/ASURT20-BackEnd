const Application = require('../models/application');
// const Event = require('../models/event');
// const Team = require('../models/team');
// const Subteam = require('../models/subteam');

exports.getAllApps = (req, res, next) => {
    Application.find()
    .populate('user')
    .populate('event')
    .populate('selSubteam1')
    .populate('selSubteam2')
    .then(apps => {
        res.status(200).json({
            message: 'all apps fetched',
            applications: apps
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

}

exports.getApp = (req, res, next) => {}

exports.addNewApp = (req, res, next) => {
    const userId = req.body.userId;
    const eventId = req.body.eventId;
    const sub1 = req.body.selectedSubteam1; 
    const sub2 = req.body.selectedSubteam2;
    // const cvPath = req.file.path; 
    const cvPath = "dummy path";
    const userAnswers = req.body.userAnswers;

    const app = new Application({
        user: userId,
        event: eventId,
        selSubteam1: sub1,
        selSubteam2: sub2
    })
    .save()
    .then(app => {
        res.status(201).json({
            message: 'app created',
            application: app
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getUserApps = (req, res, next) => {}

exports.getEventApps = (req, res, next) => {}

exports.getSubteamApps = (req, res, next) => {}

exports.addNewApp = (req, res, next) => {}

// exports.getAllApps = (req, res, next) => {}