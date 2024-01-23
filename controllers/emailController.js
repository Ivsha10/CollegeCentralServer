const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendVerificationCode = (receiver, fullName, code, res) => {



    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure:false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PWD
        }
    });

    let html = (fs.readFileSync(path.join(__dirname, "..", "public", "templates", `verify.html`), { encoding: 'utf-8', flag: 'r' }));



    html = html.replace('{{fullName}}', fullName);
    html = html.replace('{{code}}', code);

    let emailOptions = {
        from:  process.env.EMAIL_USER,
        to: receiver,
        subject: 'Your verification code',
        html: html,
    }

   transporter.sendMail(emailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json('Code sent');
        }
    }) 
 
}

module.exports = { sendVerificationCode };