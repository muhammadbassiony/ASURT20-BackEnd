const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, maxlength: 50 },

        email: { type: String, required: true, maxlength: 256 },
        password: { type: String, required: true },

        member: { type: Schema.Types.ObjectId, ref: 'Member', default: null},
        level: { 
            type: Number, 
            enum: [0, 1, 2, 3],    // 0 = guest, 1 = technical member, 
            // 2 = technical head & managment member, 3 = admins: managment heads
            default: 0
        },
        
        mobile: { type: String, maxlength: 13 },
        birthDate: { type: Date },
        nationalId: { type: String, maxlength: 20 },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE', 'NA'],
            default: 'NA'
        },

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
        emergencyContact_mobile: { type: String, maxlength: 13 }

    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
