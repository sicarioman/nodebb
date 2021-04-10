const EmailService = require('../communication/email.services');
const UserService = require('../user/user.services');
const tokenGenerator = require('../../helpers/token-generator');
const User = require('../../models/user.model');

module.exports = class VerifyService {

    /**
     * Send Verification Code to email
     * @param {string} email 
     * @returns {Promise}
     */
    static async sendEmailVerificationCode(email) {
        try {
            const verifyCode = await tokenGenerator(32);
            
            const body = `
                <h1>You Successfully Signed Up!</h1>
                <p>Email Verification</p>
                <p>Verify Code: ${verifyCode}</p>
                <p>Send a POST Request with body{email, code} to /api/auth/verification/email to verify your email</p>
            `;

            // Set Verification Code
            await this.setEmailVerificationCode(email, verifyCode, Date.now() + 600000);

            // Email Code
            return EmailService.send(null, email, 'Verify Your Email Address', body);
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Set Email Verification Code for a User
     * @param {string} email 
     * @param {string} code 
     * @param {Date} expireTime 
     * @returns {Promise}
     */
    static async setEmailVerificationCode(email, code, expireTime) {
        try {
            const user = await UserService.getUser(null, email);
            user.emailVerifyCode = code;
            user.emailVerifyCodeExpiration = expireTime;
            
            await user.save();
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Returns User Object on Success
     * @param {string} email 
     * @param {string} code 
     * @returns {Object}
     */
    static async verifyEmail(email, code) {
        try {
            const user = await UserService.getUser(null, email);

            if(user.emailVerifyCode !== code) {
                const error = new Error('Invalid Verification Code');
                error.statusCode = 422;
                throw error;
            }

            if(Date.now() > user.emailVerifyCodeExpiration) {
                const error = new Error('Verify Code Expired');
                error.statusCode = 422;
                throw error;
            }

            user.verifiedEmail = true;
            user.emailVerifyCode = undefined;
            user.emailVerifyCodeExpiration = undefined;
            return await user.save(); 
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Returns True if User Email is Verified
     * @param {string} email 
     * @returns {boolean}
     */
    static async isEmailVerified(email) {
        try {
            return (await UserService.getUser(null, email)).verifiedEmail;
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }
};