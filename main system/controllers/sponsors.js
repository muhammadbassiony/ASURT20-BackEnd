const Sponsor = require("../models/sponsors");
// const error = require("../utils/errorFunction");
const fs = require("fs");
const { Types,Error } = require("mongoose");

exports.getAll = async (req, res, next) => {
    const sponsors = await Sponsor.find({}).select("-__v");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).json({ 
        message: "all sponsors fetched",
        sponsors: sponsors
    });
};

exports.getActivated = (req, res, next) => {
    Sponsor.find({ isChecked: true})
    .then(spns => {
        if(!spns){
            const error = new Error('No active sponsors found!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'active sponsors fetched!',
            sponsors: spns
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

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
    console.log('checkpoint 3', name, desc, file);

    try {
        const doc = await Sponsor.findOne({ name: name });
        if (doc) {
            fs.unlink(`images/sponsors/${file.filename}`, (err) => {});
            error("Sponsor already exists", 400, [{ id: doc._id, name }]);
        }
        console.log('checkpoint 3', name, desc, file);
        const data = { name, desc: desc, logo: file.path, message: "sponsor created!" };
        console.log('checkpoint 1', data);
        const newSponsor = await new Sponsor(data).save();
        data.id = newSponsor._id;
        console.log('checkpoint 2', newSponsor, data);
        res.status(201).json({
            sponsor: data,
        });
    } catch (err) {
        next(err);
    }
};


