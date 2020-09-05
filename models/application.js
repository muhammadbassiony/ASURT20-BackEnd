const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
    {
        

    },
    { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);


// export interface Application {
//     //metadata and application questions  - same for all applications for this team
//     appId: string;

//     // team: Team;     //must be immutable
//     userId: string;     //must be immutable
//     eventId: string;    //must be immutable

//     //users answers
//     userAnswers: Question[];
//     selectedSubteam1: Subteam;
//     selectedSubteam2: Subteam;
//     userCV: File;

//     phase1Status: ApplicationStatus;
//     phase2Status: ApplicationStatus;

    
// }