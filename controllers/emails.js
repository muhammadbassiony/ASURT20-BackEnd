const User = require('../models/user');
const Member = require('../models/member');

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mimotamer@gmail.com',
      pass: '' // naturally, replace both with your real credentials or an application-specific password
    }
});

const mailOptions = {
    from: 'mimotamer@gmail.com',
    to: ' ',
    subject: 'Invoices due',
    text: 'Dudes, we really need your money.'
};
  
exports.sendMails = (emails) => {
    mailOptions.to = emails;

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //     }
    // });

    return transporter.sendMail(mail);
}