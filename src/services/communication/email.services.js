const nodemailer = require('nodemailer');
const mailConfig = require('../../config/mail');
const mailTransporter = nodemailer.createTransport(mailConfig.smtp);

module.exports = class EmailService {

    /**
     * Send Emails
     * Returns mailTransporter Promise
     * @param {string} from - From Email Address
     * @param {string} to - To Email Address
     * @param {string} Subject - Subject of Email
     * @param {string} body - HTML IS ALLOWED!
     * @returns {Promise}
     */
    static async send(from, to, subject, body) {
        if(!from) {
            from = mailConfig.general.noreply_mail;
        }

        return mailTransporter.sendMail({
            to: to,
            from: from,
            subject: subject,
            html: body
        });
    }
};