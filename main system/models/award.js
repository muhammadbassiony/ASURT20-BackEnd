const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const awardsSchema = new Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        imagePath: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("Award", awardsSchema);
