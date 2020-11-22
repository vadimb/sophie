const nodemailer = require('nodemailer');
const { SMAPT_HOST, SMAPT_USER, SMAPT_PASS, EMAIL_FROM, EMAIL_SUBJECT } = require('../../config');
const template = require('./template');

const transporter = nodemailer.createTransport({
    host: SMAPT_HOST,
    port: 587,
    secure: false,
    auth: {
        user: SMAPT_USER,
        pass: SMAPT_PASS
    }
});

const sendMail = async ({ to, content, contex }) => {
    const mail = {
        from: EMAIL_FROM,
        to,
        subject: EMAIL_SUBJECT,
        html: template(contex),
        attachments: [
            {
                filename: 'form.pdf',
                content
            },
        ],
    };

    await transporter.sendMail(mail);
}


module.exports = { sendMail };