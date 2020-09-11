const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
        team: { type: Schema.Types.ObjectId, ref: 'Team'},
        subteam: { type: Schema.Types.ObjectId, ref: 'Subteam'},
        head: { type: Boolean, default: false}

    },
    { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);