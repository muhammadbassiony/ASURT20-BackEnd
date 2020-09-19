const Application = require('../models/application');
const Event = require('../models/event');

const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path')

const { Parser, transforms: { unwind } } = require('json2csv');

const Email = require('./emails');
const currentSeason = '20-21';  //create setter and getter later

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

//adjust function to receive form data not json
exports.newApp = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");

    const user = mongoose.Types.ObjectId(req.body.userId);
    const event = mongoose.Types.ObjectId(req.body.eventId);
    const selSubteam1 = mongoose.Types.ObjectId(req.body.selectedSubteam1);
    const selSubteam2 = mongoose.Types.ObjectId(req.body.selectedSubteam2);
    const cvPath = url + "/cvs/" + req.file.filename;
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
        return apps.filter(app => 
            JSON.stringify(app.event.season) === JSON.stringify(currentSeason));
    })
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
    .populate('event')
    .populate('selSubteam1')
    .populate('selSubteam2')
    .then(apps => {
        return apps.filter(app => 
            JSON.stringify(app.event.season) === JSON.stringify(currentSeason));
    })
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
    .then(apps => {
        return apps.filter(app => 
            JSON.stringify(app.event.season) === JSON.stringify(currentSeason));
    })
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

exports.updateApp = (req, res, next) => {
    const appId = req.params.appId;

    const user = mongoose.Types.ObjectId(req.body.userId);
    const event = mongoose.Types.ObjectId(req.body.eventId);
    const selSubteam1 = mongoose.Types.ObjectId(req.body.selectedSubteam1);
    const selSubteam2 = mongoose.Types.ObjectId(req.body.selectedSubteam2);
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

exports.deleteApp = (req, res, next) => { }

//cannot send more than 500 emails in 1 day from a personal account!!
// add validation 
exports.sendAcceptedEmails = (req, res, next) => { 
    const eventId = req.params.eventId;
    const phase = req.body.phase;

    emails = [];
    countAccepted = 0;

    Application.find({ event: eventId })
    .populate('user')
    .then(apps => {
        apps.forEach(app => {
            if(JSON.stringify(app.currentPhase) === JSON.stringify(phase) && 
                    JSON.stringify(app.currentPhaseStatus) === JSON.stringify('ACCEPTED')){
                emails.push(app.user.email);
                countAccepted ++;
            }
        });

        if(countAccepted >= 500){
            const error = new Error('Exceeded the number of allowed emails per day!');
            error.statusCode = 500;
            throw error;
        }
        if(countAccepted <= 0){
            const error = new Error('No accepted applicants');
            error.statusCode = 500;
            throw error;
        }

        emails = emails.join(', ');
        // console.log(emails);
        return Email.sendMails(emails);
    })
    .then(result => {
        res.status(200).json({
            message: 'acceptance emails sent!'
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
}

exports.sendRejectedEmails = (req, res, next) => { 
    const eventId = req.params.eventId;
    const phase = req.body.phase;

    emails = [];
    countRejected = 0;

    Application.find({ event: eventId })
    .populate('user')
    .then(apps => {
        apps.forEach(app => {
            if(JSON.stringify(app.currentPhase) === JSON.stringify(phase) && 
                    JSON.stringify(app.currentPhaseStatus) !== JSON.stringify('ACCEPTED')){
                emails.push(app.user.email);
                countRejected ++;
            }
        });

        if(countRejected >= 500){
            const error = new Error('Exceeded the number of allowed emails per day!');
            error.statusCode = 500;
            throw error;
        }
        if(countRejected <= 0){
            const error = new Error('No rejected applicants');
            error.statusCode = 500;
            throw error;
        }

        emails = emails.join(', ');
        return Email.sendMails(emails);
    })
    .then(result => {
        res.status(200).json({
            message: 'rejection emails sent!'
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
}

/*********************** CSV **********************/

const fields = [
    { label: 'Name', value: 'user.name' },
    { label: 'Email', value: 'user.email' },
    { label: 'Mobile',  value: 'user.mobile' },
    { label: 'Birth Date', value: 'user.birthDate' },
    { label: 'University',  value: 'user.university' },
    { label: 'Faculty', value: 'user.faculty' },
    { label: 'department', value: 'user.departmed' },
    {  label: 'Grad Year', value: 'user.graduationYear'  },
    { label: 'Credit',  value: 'user.mobile' },
    { label: 'Choice 1', value: 'selSubteam1.name' },
    { label: 'Choice 2',  value: 'selSubteam2.name' },
    { label: 'User Id', value: 'user._id' },
    { label: 'App Id', value: '_id' }
];
const transforms = [unwind({ paths: ['user', 'selSubteam1', 'selSubteam2'], blankOut: true })];
const json2csvParser = new Parser({ fields, transforms });

exports.exportCsv = (req, res, next) => {
    const eventId = req.params.eventId;

    Application.find({ event: eventId }, '_id user selSubteam1 selSubteam2 season')
    .populate('user', '_id name email mobile birthdate university faculty graduationYear department')
    .populate('selSubteam1', 'name -_id')
    .populate('selSubteam2', 'name -_id')
    .then(apps => {
        return apps.filter(app => 
            JSON.stringify(app.season) === JSON.stringify(currentSeason));
    })
    .then(apps => {
        const filePath = path.join(__dirname, "../excel-files", eventId + "-query.csv");
        
        const csv = json2csvParser.parse(apps);

        fs.writeFile(filePath, csv, function(err) {
            if (err) throw err;
            res.status(200).json({
                message: 'created excel file'
                // applications: apps  //send file here
            });
        });

    })
    // .then(apps => {
    //     res.status(200).json({
    //         message: 'apps fetched',
    //         applications: apps  //send file here
    //     });
    // })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });    
}
