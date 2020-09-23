const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interviewSchema = new Schema(
    {
        start: { type: Date, required: true},
        end: { type: Date, required: true},

        title: { type: String, required: true},
        url: { type: String},

        backgroundColor: { type: String },
        
        extendedProps: {
            ivStatus: {
                type: String,
                enum: ['SCHEDULED', 'DONE', 'BOOKED', 'MISSED'],
                default: 'SCHEDULED'
            },
            application: { type: Schema.Types.ObjectId, ref: 'Application' },
            event: { type: Schema.Types.ObjectId, ref: 'Event' }
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
