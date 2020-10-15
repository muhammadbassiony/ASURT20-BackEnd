const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const fs = require("fs");
const emailTemps = require("./email-templates");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "asurt.managment@gmail.com", //mimotamer@gmail.com
        pass: "asurtIT20",
        // naturally, replace both with your real credentials or an application-specific password
    },
});

// Configure mailgen by setting a theme and your product info
var mailGenerator = new Mailgen({
    theme: "cerberus",
    product: {
        // Appears in header & footer of e-mails
        name: "ASU Racing Team",
        link: "https://www.youtube.com/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
    },
});

exports.sendMails = (emails, type) => {
    var email;
    switch (type) {
        case "PA": // Phase Acceptance
            email = emailTemps.phaseAcceptanceEmail;
            break;
        case "PR": // Phase Rejection
            email = emailTemps.phaseRejectionEmail;
            break;
        case "FA": // Final Acceptance
            email = emailTemps.finalAcceptanceEmail;
            break;
        default:
            break;
    }

    // Generate an HTML email with the provided contents
    var emailBody = mailGenerator.generate(email);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    var emailText = mailGenerator.generatePlaintext(email);

    const mailOptions = {
        from: "mimotamer@gmail.com",
        to: " ",
        subject: "Invoices due",
        text: "Dudes, we really need your money.",
        html: emailBody,
    };
    mailOptions.to = emails;
    console.log(mailOptions.to, typeof mailOptions.to);

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

    return transporter.sendMail(mailOptions);
};
