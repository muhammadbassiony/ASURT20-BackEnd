const Interview = require('../models/interview');
const mongoose = require("mongoose");

getBckClr = (status) => {
    if(JSON.stringify(status) === JSON.stringify('SCHEDULED')){
        return "#3562bd";
    }
    if(JSON.stringify(status) === JSON.stringify('DONE')){
        return "#00d92b";
    }
    if(JSON.stringify(status) === JSON.stringify('BOOKED')){
        return "#f00c89";
    }
    if(JSON.stringify(status) === JSON.stringify('MISSED')){
        return "#fc2121";
    }
    return null;
}

exports.getAllInterviews = (req, res, next) => {
    Interview.find()
    .populate('extendedProps.application')
    .then(allIntrvs => {
        res.status(200).json({
            message: 'fetched all interviews',
            interviews: allIntrvs
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });  
}

exports.getInterview = (req, res, next) => {
    const ivId = req.params.ivId;

    Interview.findById(ivId)
    .populate('extendedProps.application')
    .then(iv => {
        if(!iv){
            const error = new Error('Could not find interview');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'interview fetched',
            interview: iv
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });  
}

exports.newInterview = (req, res, next) => {
    const start = req.body.start;
    const end = req.body.end;
    const title = req.body.title;
    const url = req.body.url;
    const backgroundColor = req.body.backgroundColor;

    const intrv = new Interview({
        start: start,
        end: end,
        title: title,
        url: url,
        backgroundColor: backgroundColor
    })
    .save()
    .then(intrv => {
        res.status(201).json({
            message: 'new interview created!',
            interview: intrv
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });   
}

exports.getAvailableDates = (req, res, next) => {
    const availables = [];
    const avs = [];

    Interview.find()
    .then(ivs => {
        ivs.forEach(iv => {
            if(JSON.stringify(iv.extendedProps.ivStatus) === JSON.stringify('SCHEDULED')){
                availables.push({ ivId: iv._id, start: iv.start });
            }
        });
    
        availables.forEach(av => {
            hrsmins = (av.start.getUTCHours()+2) + ":" + ("0" + av.start.getUTCMinutes()).slice(-2);
            date = av.start.toUTCString().substring(0,3)+" "+ av.start.getUTCDate()+"-"+(av.start.getUTCMonth()+1);
            avs.push({ _id: av.ivId, time: hrsmins, date: date });
        });
        
        res.status(200).json({
            message: 'available dates fetched',
            availableDates: avs
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }); 
}

exports.updateInterview = (req, res, next) => {
    const ivId = req.params.ivId;

    const start = req.body.start;
    const end = req.body.end;
    const title = req.body.title;
    const url = req.body.url;
    const backgroundColor = req.body.backgroundColor;
    const extendedProps = req.body.extendedProps;
    const appId = mongoose.Types.ObjectId(extendedProps.appId);

    Interview.findById(ivId)
    .then(iv => {
        if(!iv){
            const error = new Error('Could not find interview');
            error.statusCode = 404;
            throw error;
        }

        iv.start = start;
        iv.end = end;
        iv.title = title;
        iv.url = url;
        iv.backgroundColor = getBckClr(extendedProps.ivStatus);
        iv.extendedProps = extendedProps;
        iv.extendedProps.application = appId;

        return iv.save();
    })
    .then(iv => {
        res.status(200).json({
            message: 'interview updated',
            interview: iv
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.deleteInterview = (req, res, next) => {
    const ivId = req.params.ivId;

    Interview.findById(ivId)
    // .populate('extendedProps.application')
    .then(iv => {
        if(!iv){
            const error = new Error('Could not find interview');
            error.statusCode = 404;
            throw error;
        }
        return Interview.findByIdAndDelete(ivId);
    })
    .then(result => {
        res.status(200).json({ message: 'Deleted post.' });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });  
}