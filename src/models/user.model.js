const mongoose = require('mongoose');
const ROLE = require('../helpers/Role');

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: Object.values(ROLE),
        default: ROLE.USER,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: String,
    verifiedEmail: {
        type: Boolean,
        required: true,
        default: false
    },
    emailVerifyCode: String,
    emailVerifyCodeExpiration: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);