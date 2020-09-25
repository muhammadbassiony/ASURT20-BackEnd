const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        team: { type: Schema.Types.ObjectId, ref: 'Team', required: true},
        season: {
            type: String,
            enum: ['20-21', '21-22','22-23', '23-24', '24-25'], //system should 100% be revamped by then
            required: true
        },

        eventActive: { type: Boolean, default: true },

        questions: [{ type: String }],

        activeSubteams: [{ type: Schema.Types.ObjectId, ref: 'Subteam'}],

        currentPhase: {
            type: String,
            enum: ['SCREENING', 'HR_IV', 'TECH_MISSION', 'DR_IV'],
            default: 'SCREENING'
        },
        
        startDate: { type: Date },
        endDate: { type: Date },

        numApplicants: {type: Number, default: 0},
        numAccepted: {type: Number, default: 0},
        numRejected: {type: Number, default: 0},
        numPendAcc: {type: Number, default: 0},
        numPendRej: {type: Number, default: 0}

    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
