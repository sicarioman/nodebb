require('dotenv').config();

module.exports = {
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    },
    api: {
        api_url: process.env.MAIL_API_URL,
        api_user: process.env.MAIL_API_USER,
        api_key: process.env.MAIL_API_KEY
    },
    general: {
        noreply_mail: process.env.NOREPLY_EMAIL
    }
};