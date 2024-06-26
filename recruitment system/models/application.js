const mongoose = require('mongoose');
const { schema } = require('./event');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User'},
        event: { type: Schema.Types.ObjectId, ref: 'Event'},

        selSubteam1: { type: Schema.Types.ObjectId, ref: 'Subteam', required: true },
        selSubteam2: { type: Schema.Types.ObjectId, ref: 'Subteam', required: true },
        cvPath: { type: String, required: true},

        userAnswers: [{
            question: { type: String },
            answer: { type: String }
        }],

        currentPhase: {
            type: String,
            enum: ['SCREENING', 'HR_IV', 'TECH_MISSION', 'DR_IV'],
            default: 'SCREENING'
        },
        currentPhaseStatus: {
            type: String,
            enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'PENDING_ACCEPTANCE', 'PENDING_REJECTION'],
            default: 'PENDING'
        },
        season: {
            type: String,
            enum: ['20-21', '21-22','22-23', '23-24', '24-25'], 
            default: '20-21'
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);