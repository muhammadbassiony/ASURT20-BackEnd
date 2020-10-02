const mongoose = require("mongoose");
const Photoroll = require("../models/photoroll");
const Comp = require("../models/competition");
// const error = require("../utils/errorFunction");
const fs = require("fs");
const { SSL_OP_NETSCAPE_CA_DN_BUG } = require("constants");

exports.getPhotoroll = async (req, res, next) => {
    const id = req.params.id;
    const phtotroll = await Photoroll.findById(id);
    try {
        if (!doc) error("Photoroll not found", 404);
        res.status(200).json({ message: 'phtotoroll fetched!', phtotroll: photoroll });
    } catch (err) {
        next(err);
    }
};

exports.updatePhotoroll = async (req, res, next) => {
    const phId = req.body._id;
    const title = req.body.title;
    const files = req.files;
    // const competitionId = req.body.competitionId;
    try {
        const images = files.map((image) => image.filename);
    } catch (error) {
        next(error);
    }
    
    console.log('\n\nPH-CNTRL : IMAGES ::\n', images);

    Photoroll.findById(phId)
    .then(photoroll => {
        if(!photoroll){
            const error = new Error('No PhotoRoll found!');
            error.statusCode = 404;
            throw error;
        }

        photoroll.title = title;
        photoroll.images = images;
        return photoroll.save();
    })
    .then(ph => {
        res.status(200).json({
            message: 'photoroll updated!',
            photoroll: ph
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

    // try {
    //     // const doc = await Photoroll.findOne({ title: title });
    //     const doc = await Photoroll.findById(phId);
    //     let photoroll;
    //     if (!doc) {
    //         // const competitionExists = await Comp.findById(competitionId);
    //         // if (!competitionExists) error("Competition doesn't exist", 404);
    //         photoroll = await new Photoroll({ title: title, images: images }).save();
    //         // competitionExists.photorolls.push(photoroll._id);
    //         // competitionExists.save();
    //     } else {
    //         const existingImages = doc.images;
    //         var allImages = [...existingImages, ...images];

    //         photoroll = await Photoroll.findOneAndUpdate({ title: title }, { images: allImages });
    //     }
    //     res.status(201).json({
    //         id: photoroll._id,
    //         compitionId: competitionId,
    //         title: title,
    //         images: allImages ? allImages : [...photoroll.images],
    //     });
    // } catch (err) {
    //     next(err);
    // }
};

exports.delete = async (req, res, next) => {
    const id = req.body._id;
    const imageName = req.body.name;
    const doc = await Photoroll.findById(id);
    try {
        if (!doc) error("Photoroll not found", 404, [{ id: id, image: imageName }]);
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


exports.getAllPhotorolls = (req, res, next) => {
    Photoroll.find()
    .then(phs => {
        if(!phs){
            const error = new Error('No PhotoRolls found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'all photorolls fetched!',
            photorolls: phs
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}


exports.addNewPhotoroll = (req, res, next) => {
    const phName = req.body.name;
    const imgs = req.body.images;

    const newPh = new Photoroll({
        title: phName,
        images: imgs
    }).save()
    .then(ph => {
        res.status(200).json({
            message: 'new photoroll created!',
            photoroll: ph
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}