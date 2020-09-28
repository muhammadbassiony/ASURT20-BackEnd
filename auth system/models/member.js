const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
        team: { type: Schema.Types.ObjectId, ref: 'Team', required: true},
        subteam: { type: Schema.Types.ObjectId, ref: 'Subteam'},
        head: { type: Boolean, default: false},
        season: {
            type: String,
            enum: ['20-21', '21-22','22-23', '23-24', '24-25'], //system should 100% be revamped by then
            required: true
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);

// TODO :: add adminstrator schema for ihub members? - no