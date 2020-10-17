exports.phaseAcceptanceEmail = {
    body: {
        greeting: "Dear Applicant, ",
        signature: false,
        intro: ["Congratulations!", "You have been accepted in the current phase!", 
            "Please visit our website or wait for a call from us to receive further instructions about the next step"],
        
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
};


exports.phaseRejectionEmail = {
    body: {
        greeting: "Dear Applicant, ",
        signature: false,
        intro: ["We hope you are having a good day", 
        "We would like to thank you for your time in the Interview and your effort in the mission",
        "Unfortunately, you didn't pass the interview phase. However, this rejection doesn't affect your future admission for any position in the team.Your are still welcomed to apply for us in any upcoming positions and events",
        "Thank you again and good luck in your upcoming plans and projects"],
        // action: {instructions: 'hey yo', color: "#ffffff"},
        outro: "Need help, or have questions? Visit us on any of our social mediaJust reply to this email, we'd love to help.",
    },
};


exports.finalAcceptanceEmail = {
    body: {
        greeting: "Dear Applicant, ",
        signature: false,
        intro: ["Congratulations!", "You have been accepted in the current phase!", 
            "You are now part of the ASU Racing Team Family",
            "Wait for a call from us to receive further instructions"],
        
        outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
};
