const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        

    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);