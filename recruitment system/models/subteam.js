const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subteamSchema = new Schema(
    {
        name: {type: String, required: true},
        team: {type: Schema.Types.ObjectId, ref: 'Team', required: true},
        head: { type: Schema.Types.ObjectId, ref: 'Member'}
    },
    { timestamps: true }
);

module.exports = mongoose.model('Subteam', subteamSchema, 'subteams');