const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const competitionSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 50 },
        visible: { type: Boolean, default: true },
        awards: [
            { type: Schema.Types.ObjectId, ref: "Award" }
        ],
        photoroll: { type: Schema.Types.ObjectId, ref: "Photoroll" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Competition", competitionSchema);
