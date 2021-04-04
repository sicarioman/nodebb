const User = require('../../models/user.model');

module.exports = class UserService {

    /**
     * Get User by ID or EMAIL
     * Returns User Promise
     * @param {number} userId
     * @returns {Promise}
     */
    static async getUser(userId, email) {
        try {
            const user = await User.findOne({$or: [{_id: userId}, {email: email}]});
            if(!user) {
                const error = new Error('User not Found');
                error.statusCode = 404;
                throw error;
            }

            return user;
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Get Email Address by ID
     * @param {number} userId
     * @returns {Promise}
     */
    static async getEmail(userId) {
        try {
            const user = await this.getUser(userId);
            return user.email;
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Set User Email Address by ID
     * Returns User Promise
     * @param {number} userId  
     * @returns {Promise}
     */
    static async setEmail(userId, email) {
        try {
            const user = await this.getUser(userId);
            user.email = email;
            return await user.save();
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Set Email Verification Code
     * Used By Email Verification Process
     * @param {string} email 
     * @param {string} code 
     * @param {Date} expireTime 
     * @returns {Promise}
     */
    static async setEmailVerificationCode(email, code, expireTime) {
        try {
            const user = await this.getUser(null, email);
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
};