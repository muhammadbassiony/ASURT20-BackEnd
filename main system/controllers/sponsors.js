const Sponsor = require("../models/sponsors");
// const error = require("../utils/errorFunction");
const fs = require("fs");
const { Types, Error } = require("mongoose");
const { findByIdAndUpdate } = require("../models/sponsors");

exports.getAll = async(req, res, next) => {
    const sponsors = await Sponsor.find({}).select("-__v");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).json({
        message: "all sponsors fetched",
        sponsors: sponsors
    });
};

exports.getActivated = (req, res, next) => {
    Sponsor.find({ isChecked: true })
        .then(spns => {
            if (!spns) {
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
exports.activate = async(req, res, next) => {
    const id = req.params.id;
    try {
        const doc = await Sponsor.findById(id);
        if (!doc) error("Sponsor not found", 404, [{ id: id }]);
        const state = doc.isChecked;
        const setState = !state;
        const updateSponser = await Sponsor.findOneAndUpdate({ _id: Types.ObjectId(id) }, { isChecked: setState });
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

exports.addSponsor = async(req, res, next) => {
 
    const { name, desc } = req.body;
    const file = req.file.path;


    try {
        // const doc = await Sponsor.findOne({ name: name });
        // if (doc) {
        //     fs.unlink(`images/sponsors/${file}`, (err) => {});
        //     error("Sponsor already exists", 400, [{ id: doc._id, name }]);
        // }
        const data = { name, desc: desc, logo: file, message: "sponsor created!" };
    
        const newSponsor = await new Sponsor(data).save();
        data.id = newSponsor._id;
        
        res.status(201).json({
            sponsor: data,
        });
    } catch (err) {
        next(err);
    }
};


exports.updateAllSponsors = async(req, res, next) => {
    const allSponsors = req.body.sponsors;

    try {
        for (let spn of allSponsors) {
            sponsor = await Sponsor.findById(spn._id);
            sponsor = spn;
            if (!sponsor) {
                const error = new Error('sponsor not found!');
                error.statusCode = 404;
                throw error;
            }
            const updatedSpn = await Sponsor.findByIdAndUpdate(sponsor._id, sponsor, { new: true });

        }

        let allSpns = await Sponsor.find();
        // console.log('\ALL UPDATED SPONSOR ::\n', allSpns);
        res.status(200).json({
            message: 'all sponsors updated!',
            sponsors: allSpns
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}