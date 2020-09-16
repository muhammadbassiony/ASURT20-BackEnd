const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true, maxlength: 50 },

        email: { type: String, required: true, maxlength: 256 },
        password: { type: String, required: true },
        
        mobile: { type: String, maxlength: 13 },
        birthDate: { type: Date },
        nationalId: { type: String, maxlength: 20 },

        university: { type: String, maxlength: 40 },
        faculty: { type: String, maxlength: 50 },
        department: { type: String, maxlength: 40 },
        credit: {
            type: String,
            enum: ['CREDIT', 'MAINSTREAM', 'NA'],
            default: 'NA'
        },
        graduationYear: { type: String, maxlength: 4 },
        collegeId: { type: String, maxlength: 10 },
        
        emergencyContact_name: { type: String, maxlength: 50 },
        emergencyContact_relation: { type: String, maxlength: 20 },
        emergencyContact_monile: { type: String, maxlength: 13 }

    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
