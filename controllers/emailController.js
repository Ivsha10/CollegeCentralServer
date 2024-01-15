const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendMail = (templateName) => {



    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'collegecentralinfo@gmail.com',
            pass: process.env.EMAIL_PWD
        }
    });

    let html = (fs.readFileSync(path.join(__dirname, "..", "public", "templates", `${templateName}.html`), { encoding: 'utf-8', flag: 'r' }));



    html = html.replace('{{text}}', 'HELLO WORLD');

    let emailOptions = {
        from: 'collegecentralinfo@gmail.com',
        to: 'djuricicivan7@gmail.com',
        subject: ' Welcome to CollegeCentral!',
        html: html,
    }

   transporter.sendMail(emailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent:', info.response);
        }
    }) 
 
}

module.exports = { sendMail };