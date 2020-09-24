const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
        team: { type: Schema.Types.ObjectId, ref: 'Team', required: true},
        subteam: { type: Schema.Types.ObjectId, ref: 'Subteam'},
        head: { type: Boolean, default: false}

    },
    { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);

// TODO :: add adminstrator schema for ihub members? - no