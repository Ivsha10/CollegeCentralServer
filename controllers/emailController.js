const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const coaches = require('../mensCoaches').coaches;
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
    }
});

const sendVerificationCode = (receiver, fullName, code, res) => {




    let html = (fs.readFileSync(path.join(__dirname, "..", "public", "templates", `verify.html`), { encoding: 'utf-8', flag: 'r' }));



    html = html.replace('{{fullName}}', fullName);
    html = html.replace('{{code}}', code);

    let emailOptions = {
        from: process.env.EMAIL_USER,
        to: receiver,
        subject: 'Your verification code',
        html: html,
    }

    transporter.sendMail(emailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json('Code sent');
        }
    })

}

const sendInvitationEmail = () => {
    coaches.forEach((coach, index) => {
        let html = fs.readFileSync(path.join(__dirname, "..", "public", "templates", "invitation.html"), { encoding: 'utf-8', flag: 'r' });
        html = html.replace('{{coach}}', coach.coach);

        let emailOptions = {
            from: process.env.EMAIL_USER,
            to: coach.email,
            subject: 'Invitation to CollegeCentral',
            html: html,
        };

        const sendWithRetry = (retryCount) => {
            setTimeout(() => {
                transporter.sendMail(emailOptions, (err, info) => {
                    if (err) {
                        console.error(``);
                        // Retry with increasing delays
                        if (retryCount < 3) {
                            const nextRetryCount = retryCount + 1;
                            console.log(``);
                            sendWithRetry(nextRetryCount);
                        } else {
                            console.error(``);
                        }
                    } else {
                        console.log(`Email sent to: ${coach.coach}`);
                    }
                });
            }, 5000 * Math.pow(2, retryCount)); // Exponential backoff for retries
        };

        // Start the sending process with retries
        sendWithRetry(0);
    });
};


module.exports = { sendVerificationCode, sendInvitationEmail };