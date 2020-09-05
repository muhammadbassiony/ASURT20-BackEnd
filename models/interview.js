const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema(
    {
        

    },
    { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);