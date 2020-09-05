const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        team: { type: Schema.Types.ObjectId, ref: 'Team'},
        season: {
            type: String,
            enum: ['20-21', '21-22','22-23', '23-24', '24-25'],
            required: true
        },
        eventActive: { type: Boolean, default: true},

        questions: [{
            question: { type: String }
        }],

        startDate: { type: Date },
        endDate: { type: Date },

        numApplicants: {type: Number, default: 0, max: 600},
        numAccepted: {type: Number, default: 0},
        numRejected: {type: Number, default: 0}

    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
