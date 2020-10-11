const { Error } = require("mongoose");
const Competition = require("../models/competition");
const Award = require('../models/award');

exports.addNewCompetition = async (req, res, next) => {
    const name = req.body.name;
    try {
        const competition = await Competition.findOne({ name: name });
        if (competition) error("Competition already exists", 400, [{ competition }]);
        const doc = await new Competition({ name }).save();
        res.status(201).json({ competition: doc });
    } catch (err) {
        next(err);
    }
};

exports.getAllCompetitions = async (req, res, next) => {
    
    try {
        // const competitions = await Competition.find().populate("photoroll").populate("awards");
        const competitions = await Competition.find();
        res.status(200).json({ 
            message: 'fetched All comps!',
            competitions: competitions
        });
    } catch (err) {
        next(err);
    }
};

exports.getAllCompetitionsPopulated = async (req, res, next) => {
    try {
        const competitions = await Competition.find().populate("photoroll").populate("awards");
        // const competitions = await Competition.find();
        res.status(200).json({ 
            message: 'fetched All comps!',
            competitions: competitions
        });
    } catch (err) {
        next(err);
    }
};

exports.getCompetition = async (req, res, next) => {
    const id = req.params.id;
    try {
        const competition = await Competition.findById(id).populate("photoroll").populate("awards");
        if (!competition) error("Competition not found", 404, [{ id }]);
        res.status(200).json({ 
            message: 'fetched comp!',
            competition: competition
        });
    } catch (err) {
        if (err instanceof Error.CastError) {
            (err.message = "Invalid id"), (err.statusCode = 400);
        }
        next(err);
    }
};

exports.updateCompetition = (req, res, next) => {
    const compId = req.params.compId;
    
    const name = req.body.name;
    const visible = req.body.visible;
    const awards = req.body.awards;
    const photoroll = req.body.photoroll;


    Competition.findById(compId)
    .then(comp => {
        if (!comp) throw new Error("Competition doesn't exist", 404);

        comp.name = name;
        comp.visible = visible;
        comp.awards = awards;
        comp.photoroll = photoroll;

        return comp.save();
    })
    .then(updatedComp => {
        res.status(201).json({
            message: 'competition updated!',
            competition: updatedComp
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}



exports.addNewAward = (req, res, next) => {
    const compId = req.params.compId;
    // console.log('ADD NEW AWARD :: \n');
    const title = req.body.title;
    const description = req.body.description;
    const imagePrize = req.file.path;
    // console.log('ADD NEW AWARD :: \n', title, description);

    let comp;

    let award = new Award({
        // competitionId: competitionId,
        title: title,
        description: description,
        imagePath: imagePrize
    });

    Competition.findById(compId)
    .then((competitionExists) => {
        if (!competitionExists) errorFunction("Competition doesn't exist", 404);
        comp = competitionExists;

        return award.save();
    })
    .then(aw => {
        comp.awards.push(aw._id);
        award = aw;
        return comp.save();
    })
    .then(result => {
        res.status(201).json({
            message: "saved successfully!!",
            award: award
        });
    })
    .catch((err) => next(err));
};


// // review this function - not needed?
// exports.getPrizes = (req, res, next) => {
//     const id = req.params.id;

//     // FIND BY COMPETITION ID!! - validate competition exists first as well

//     Award.findById(id)
//         .then((result) => {
//             if (result.length <= 0) {
//                 errorFunction(`There's no prizes with the id : ${id}`, 404);
//             }

//             res.status(200).json(result);
//         })
//         .catch((err) => {
//             if (err instanceof mongoose.Error.CastError) {
//                 err.message = "Invalid id";
//                 err.statusCode = 400;
//             }
//             next(err);
//         });
// };

exports.updateAward = (req, res, next) => {
    const awardId = req.params.awardId;

    const title = req.body.title;
    const description = req.body.description;
    const imagePath = req.file.path;

    Award.findById(awardId)
    .then(award => {
        if(!award){
            const error = new Error('Could not find this award');
            error.statusCode = 404;
            throw error;
        }

        award.title = title;
        award.description = description;
        award.imagePath = imagePath;

        return award.save();
    })
    .then(award => {
        res.status(201).json({
            award: award
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}


exports.deleteAward = (req, res, next) => {
    const awardId = req.params.awardId;
    const compId = req.params.compId;

    //delete award pic 

    Competition.findById(compId)
    .then(comp => {
        comp.awards.filter(aw => aw !== awardId);

        return comp.save();
    })
    .then(updatedComp => {
        return Award.findByIdAndDelete(awardId);
    })
    .then(aw => {
        res.status(200).json({
            message: 'award deleted!'
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}
