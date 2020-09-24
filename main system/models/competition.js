const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const competitionSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 50 },
        visible: { type: Boolean, default: true },
        prizes: [{ type: Schema.Types.ObjectId, ref: "Prize" }],
        photoroll: { type: Schema.Types.ObjectId, ref: "Photoroll" },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Competition", competitionSchema);
