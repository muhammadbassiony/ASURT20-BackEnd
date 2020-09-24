const Prize = require("../models/prizes");
const Comp = require("../models/competition");
// const errorFunction = require("../utils/errorFunction");

const mongoose = require("mongoose");
const competition = require("../models/competition");

exports.addPrize = (req, res, next) => {
    const competitionId = req.body.competitionId;
    //change to id and cast it as an id - use the next line
    // const competitionId = mongoose.Types.ObjectId(req.params.competitionId);
    const title = req.body.title;
    const description = req.body.description;
    const imagePrize = req.file.path;

    // REPLACE  this entire function whith the following flow:
    // 1- get competition by ID if not found throw error
    // 2- if found: save this award with the competition Id

    const prize = new Prize({
        competitionId: competitionId,
        title: title,
        description: description,
        imagePrize: imagePrize,
    });
    Comp.findById(competitionId)
        .then((competitionExists) => {
            if (!competitionExists) errorFunction("Competition doesn't exist", 404);
            prize
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

exports.getPrizes = (req, res, next) => {
    const id = req.params.id;

    // FIND BY COMPETITION ID!! - validate competition exists first as well

    Prize.findById(id)
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
