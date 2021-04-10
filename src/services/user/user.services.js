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
     * Get User Account Type by ID
     * Returns User Account Type String
     * @param {number} userId
     * @returns {string}
     */
    static async getType(userId) {
        try {
            return (await this.getUser(userId)).type;
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
        }
    }

    /**
     * Get Email Address by ID
     * @param {number} userId
     * @returns {Promise}
     */
    static async getEmail(userId) {
        try {
            return (await this.getUser(userId)).email;
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
};