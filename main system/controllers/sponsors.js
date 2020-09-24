const Sponsor = require("../models/sponsors");
// const error = require("../utils/errorFunction");
const fs = require("fs");
const { Types,Error } = require("mongoose");

exports.getAll = async (req, res, next) => {
    const sponsors = await Sponsor.find({}).select("-__v");
    res.status(200).json({ sponsors });
};

//  USE ID!!
exports.activate = async (req, res, next) => {
    const id = req.params.id;
    try {
        const doc = await Sponsor.findById(id);
        if (!doc) error("Sponsor not found", 404, [{ id: id }]);
        const state = doc.isChecked;
        const setState = !state;
        const updateSponser = await Sponsor.findOneAndUpdate(
            { _id: Types.ObjectId(id) },
            { isChecked: setState }
        );
        const data = {
            id: id,
            name: updateSponser.name,
            isChecked: setState,
            desc: updateSponser.desc,
            message: `Sponsor is now ${setState ? "Enabled" : "Disabled"}`,
        };

        res.status(201).json({
            sponsor: data,
        });
    } catch (err) {
        if (err instanceof Error.CastError) {
            (err.message = "Invalid id"), (err.statusCode = 400);
        }
        next(err);
    }
};

exports.addSponsor = async (req, res, next) => {
    const { name, desc } = req.body;
    const file = req.file;

    try {
        const doc = await Sponsor.findOne({ name: name });
        if (doc) {
            fs.unlink(`images/sponsors/${file.filename}`, (err) => {});
            error("Sponsor already exists", 400, [{ id: doc._id, name }]);
        }
        const data = { name, desc: desc, logo: file.path, message: "sponsor created!" };
        const newSponsor = await new Sponsor(data).save();
        data.id = newSponsor._id;
        res.status(201).json({
            sponsor: data,
        });
    } catch (err) {
        next(err);
    }
};
