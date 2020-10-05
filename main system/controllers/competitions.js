const { Error } = require("mongoose");
const Competition = require("../models/competition");
const Award = require('../models/award');

exports.addNewCompetition = async (req, res, next) => {
    const name = req.body.name;
    try {
        const competition = await Competition.findOne({ name });
        if (competition) error("Competition already exists", 400, [{ competition }]);
        const doc = await new Competition({ name }).save();
        res.status(201).json({ competition: doc });
    } catch (err) {
        next(err);
    }
};

exports.getAllCompetitions = async (req, res, next) => {
    try {
        const competitions = await Competition.find().populate("photoroll").populate("awards");
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



exports.addNewAward = (req, res, next) => {
    const competitionId = req.body.competitionId;
    //change to id and cast it as an id - use the next line
    // const competitionId = mongoose.Types.ObjectId(req.params.competitionId);
    const title = req.body.title;
    const description = req.body.description;
    const imagePrize = req.file.path;

    // REPLACE  this entire function whith the following flow:
    // 1- get competition by ID if not found throw error
    // 2- if found: save this award with the competition Id

    const award = new Award({
        competitionId: competitionId,
        title: title,
        description: description,
        imagePath: imagePrize,
    });

    Competition.findById(competitionId)
    .then((competitionExists) => {
        if (!competitionExists) errorFunction("Competition doesn't exist", 404);

        award
        .save()
        .then((result) => {
            competitionExists.prizes.push(result._id);
            competitionExists.save();
            res.status(201).json({
                message: "saved successfully!!",
                award: result,
            });
        })
        .catch((err) => {
            next(err);
        });
    })
    .catch((err) => next(err));
};


// review this function
exports.getPrizes = (req, res, next) => {
    const id = req.params.id;

    // FIND BY COMPETITION ID!! - validate competition exists first as well

    Award.findById(id)
        .then((result) => {
            if (result.length <= 0) {
                errorFunction(`There's no prizes with the id : ${id}`, 404);
            }

            res.status(200).json(result);
        })
        .catch((err) => {
            if (err instanceof mongoose.Error.CastError) {
                err.message = "Invalid id";
                err.statusCode = 400;
            }
            next(err);
        });
};
