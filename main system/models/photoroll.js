const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photorollSchema = new Schema(
    {
        title: { type: String, required: true },
        images: [{ type: String }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Photoroll", photorollSchema);
