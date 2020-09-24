const { Error } = require("mongoose");
const Comp = require("../models/competition");
// const error = require("../utils/errorFunction");

exports.add = async (req, res, next) => {
    const name = req.body.name;
    try {
        const competition = await Comp.findOne({ name });
        if (competition) error("Competition already exists", 400, [{ competition }]);
        const doc = await new Comp({ name }).save();
        res.status(201).json({ competition: doc });
    } catch (err) {
        next(err);
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const competitions = await Comp.find().populate("photoroll").populate("prizes");
        res.status(200).json({ competitions });
    } catch (err) {
        next(err);
    }
};

exports.getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const competition = await Comp.findById(id).populate("photoroll").populate("prizes");
        if (!competition) error("Competition not found", 404, [{ id }]);
        res.status(200).json({ competition });
    } catch (err) {
        if (err instanceof Error.CastError) {
            (err.message = "Invalid id"), (err.statusCode = 400);
        }
        next(err);
    }
};
