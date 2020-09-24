const mongoose = require("mongoose");
const Photoroll = require("../models/photoroll");
const Comp = require("../models/competition");
// const error = require("../utils/errorFunction");
const fs = require("fs");

exports.getPhotoroll = async (req, res, next) => {
    const id = req.params.id;
    const phtotroll = await Photoroll.findById(id);
    try {
        if (!doc) error("Photorol not found", 404);
        res.status(200).json({ message: 'phtotoroll fetched!', phtotroll: photoroll });
    } catch (err) {
        next(err);
    }
};

exports.updatePhotoroll = async (req, res, next) => {
    const title = req.body.title;
    const files = req.files;
    const competitionId = req.body.competitionId;
    const images = files.map((image) => image.filename);
    try {
        const doc = await Photoroll.findOne({ title: title });
        let photoroll;
        if (!doc) {
            const competitionExists = await Comp.findById(competitionId);
            if (!competitionExists) error("Competition doesn't exist", 404);
            photoroll = await new Photoroll({ title: title, images: images }).save();
            competitionExists.photorolls.push(photoroll._id);
            competitionExists.save();
        } else {
            const existingImages = doc.images;
            var allImages = [...existingImages, ...images];

            photoroll = await Photoroll.findOneAndUpdate({ title: title }, { images: allImages });
        }
        res.json({
            id: photoroll._id,
            compitionId: competitionId,
            title: title,
            images: allImages ? allImages : [...photoroll.images],
        });
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    const id = req.body.id;
    const imageName = req.body.name;
    const doc = await Photoroll.findById(id);
    try {
        if (!doc) error("Photorol not found", 404, [{ id: id, image: imageName }]);
        const images = doc.images;
        const imageExists = images.includes(imageName);
        if (!imageExists) error("Image not found", 404, [{ id: id, image: imageName }]);
        const imagesList = images.filter((value) => value !== imageName);
        await Photoroll.findOneAndUpdate(
            { _id: mongoose.Types.ObjectId(id) },
            { images: imagesList }
        );
        fs.unlink(`images/photorolls/${imageName}`, (err) => {});

        res.status(200).json({ title: id, deleted: imageName, images: imagesList });
    } catch (err) {
        next(err);
    }
};
