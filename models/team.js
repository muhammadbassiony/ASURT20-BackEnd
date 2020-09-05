const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        name: {type: String, required: true},
        subteams: [{
            name: {type: Schema.Types.ObjectId, ref: 'Subteam'}
        }]

    },
    { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);