const Application = require('../models/application');
const Event = require('../models/event');
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

exports.getApp = (req, res, next) => {
    const appId = req.params.appId;

    Application.findById(appId)
    .populate('user')
    .populate('event')
    .populate('selSubteam1')
    .populate('selSubteam2')
    .then(app => {
        if(!app){
            const error = new Error('Could not find event');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'app fetched',
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

exports.newApp = (req, res, next) => {
    const user = req.body.userId;
    const event = req.body.eventId;
    const selSubteam1 = req.body.selectedSubteam1;
    const selSubteam2 = req.body.selectedSubteam2;
    const cvPath = req.body.cvPath;
    const userAnswers = req.body.userAnswers;

    const app = new Application({
        user: user,
        event: event,
        selSubteam1: selSubteam1,
        selSubteam2: selSubteam2,
        cvPath: cvPath,
        userAnswers: userAnswers
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

exports.getUserApps = (req, res, next) => {
    const userId = req.params.userId;

    Application.find({ user: userId })
    .populate('user')
    .populate('event')
    .populate('selSubteam1')
    .populate('selSubteam2')
    .then(apps => {
        res.status(200).json({
            message: 'app fetched',
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

exports.getEventApps = (req, res, next) => {
    const eventId = req.params.eventId;

    Application.find({ event: eventId })
    .populate('user')
    .populate('selSubteam1')
    .populate('selSubteam2')
    .then(apps => {
        res.status(200).json({
            message: 'apps fetched',
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

exports.getSubteamApps = (req, res, next) => {
    const subteamId = req.params.subteamId;

    Application.find({ $or: [{ selSubteam1: subteamId }, { selSubteam2: subteamId }] })
    .populate('user')
    .populate('event')
    .populate('selSubteam1')
    .populate('selSubteam2')
    .then(app => {
        res.status(200).json({
            message: 'app fetched',
            applications: app
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });    
}

exports.updateApp = (req, res, next) => {
    const appId = req.params.appId;

    const user = req.body.userId;
    const event = req.body.eventId;
    const selSubteam1 = req.body.selectedSubteam1;
    const selSubteam2 = req.body.selectedSubteam2;
    const cvPath = req.body.cvPath;
    const userAnswers = req.body.userAnswers;
    const currentPhase = req.body.currentPhase;
    const currentPhaseStatus = req.body.currentPhaseStatus;

    Application.findById(appId)
    .then(app => {
        if(!app){
            const error = new Error('Could not find event');
            error.statusCode = 404;
            throw error;
        }

        app.user = user;
        app.event = event;
        app.selSubteam1 = selSubteam1;
        app.selSubteam2 = selSubteam2;
        app.cvPath = cvPath;
        app.userAnswers = userAnswers;
        app.currentPhase = currentPhase;
        app.currentPhaseStatus = currentPhaseStatus;

        return app.save();
    })
    .then(app => {
        res.status(200).json({
            message: 'app updated',
            app: app
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });   
}

exports.getUserEvents = (req, res, next) => {
    const user = req.params.userId;
    
    Application.find({ user: user })
    .then(userApps => {

        userEvents = [];
        userApps.forEach(e => userEvents.push(e.event));
        console.log('evss:: ', userEvents);

        return Event.find({ _id: { $in: userEvents } });
    })
    .then(userEvents => {
        // console.log('usersss::', userEvents);
        Event.find()
        .then(allEvents => {
            let difference = allEvents.filter(ev => {
                return userEvents.some(e => JSON.stringify(e._id) !== JSON.stringify(ev._id) );
            });
            
            res.status(200).json({
                message: 'user app events fetched!',
                appliedTo: userEvents,
                didntApply:  difference
            })
        })
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
}

exports.deleteApp = (req, res, next) => {
    
}