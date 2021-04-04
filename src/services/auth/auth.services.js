const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = class AuthService {

    /**
     * Returns User Object on Success
     * @param {string} type - Account Type
     * @param {string} email 
     * @param {string} username 
     * @param {string} password 
     * @returns {Object}
     */
    static async registerUser(type, email, username, password) {
        try {
            const existingUser = await User.findOne({$or: [{email: email}, {username: username}]});
            if(existingUser) {
                const error = new Error('Username or Email Already Exists');
                error.statusCode = 422;
                throw error;
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({type: type, email: email, username: username, password: hashedPassword});
            return await user.save();
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }

    /**
     * Returns JWT Token on Success
     * @param {string} email 
     * @param {string} password 
     * @returns {string}
     */
    static async loginUser(email, password) {
        try {
            const user = await User.findOne({email: email});
            if(!user) {
                const error = new Error('Email Not Found!');
                error.statusCode = 404;
                throw error;
            }

            const passwordMatches = await bcrypt.compare(password, user.password);
            if(!passwordMatches) {
                const error = new Error('Invalid Password');
                error.statusCode = 401;
                throw error;
            }

            return jwt.sign({userId: user._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h' });
        } catch(err) {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            throw err;
        }
    }
};