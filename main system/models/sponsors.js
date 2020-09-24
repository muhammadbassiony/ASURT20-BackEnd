const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sponsorsSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        logo: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        //Show sponsor to vistors
        isChecked: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("sponsor", sponsorsSchema);
