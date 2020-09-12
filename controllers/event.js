const Event = require('../models/event');
const Team = require('../models/team');
const Subteam = require('../models/subteam');

exports.getAllEvents = (req, res, next) => {
    Event.find()
    .then(events => {
        res.status(200).json({
            message: 'all events fetched',
            events: events
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.getEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findById(eventId)
    .then(event => {
        if(!event){
            const error = new Error('Could not find event');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: "event fetched",
            event: event
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.addNewEvent = (req, res, next) => {
    const teamId = req.body.teamId;
    const season = req.body.season;
    const eventActive = req.body.eventActive;
    const questions = req.body.questions;

    Team.findById(teamId)
    .then(team => {
        if(!team){
            const error = new Error('team doesnt exist');
            error.statusCode = 404;
            throw error;
        }
        // console.log("YAAAYAYA", team.subteams);

        return new Event({
            team: teamId,
            season: season,
            eventActive: eventActive,
            questions: questions,
            activeSubteams: team.subteams
        })
        .save();
    })
    .then(event => {
        res.status(201).json({
            message: 'event created!',
            event: event
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.updateEvent = (req, res, next) => {
    const eventId = req.params.eventId;

    const teamId = req.body.teamId;
    const season = req.body.season;
    const eventActive = req.body.eventActive;
    const questions = req.body.questions;
    const subteams = req.body.subteams;

    Event.findById(eventId)
    .then(event => {
        if(!event){
            const error = new Error('Could not find event');
            error.statusCode = 404;
            throw error;
        }

        event.team = teamId;
        event.season = season;
        event.eventActive = eventActive;
        event.questions = questions;
        event.activeSubteams = subteams;

        return event.save();
    })
    .then(event => {
        res.status(200).json({
            message: 'event updated',
            event: event
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.toggleEventStatus = (req, res, next) => {
    const eventId = req.params.eventId;

    Event.findById(eventId)
    .then(event => {
        event.eventActive = !event.eventActive;
        return event.save();
    })
    .then(event => {
        res.status(200).json({
            message: 'event status toggled',
            event: event
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.incrementNumApplicants = (req, res, next) => {
    const eventId = req.params.eventId;

    Event.findById(eventId)
    .then(event => {
        event.numApplicants += 1;
        return event.save();
    })
    .then(event => {
        res.status(200).json({
            message: 'event incremented number of applicants!',
            event: event
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteEvent = (req, res, next) => {}