/*eslint indent: [2, 4, {"SwitchCase": 1}]*/

const validator = require('express-validator');
const { body } = require('express-validator');

exports.validate = (method) => {
    switch(method) {
        case 'register': {
            return [
                body('email', 'Bad Email Address').exists().trim().isLength({max: 64}).isEmail().normalizeEmail(),
                body('username', 'Username must be between 2-32 Characters, and can only contain Letters, and Numbers').exists().trim().isAlphanumeric().isLength({min: 2, max: 32}),
                body('password', 'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number').exists().trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})
            ];
        }
        case 'email': {
            return body('email', 'Bad Email Address').exists().trim().isLength({max: 64}).isEmail().normalizeEmail();
        }
        case 'phoneNumber': {
            return body('phoneNumber', 'Phone Number must be valid, and between 0-15 Characters & Must start with Country code. Example: +12023311285').exists().trim().isLength({max: 15}).isMobilePhone(validator.isMobilePhoneLocales, {strictMode: true});
        }
        case 'username': {
            return body('username', 'Username must be between 2-32 Characters, and can only contain Letters, and Numbers').exists().trim().isAlphanumeric().isLength({min: 2, max: 32});
        }
        case 'password': {
            return body('password', 'Password must be at least 8 characters, and must contain at least one Uppercase letter, one Special character, and one Number').exists().trim().isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1});
        }
        case 'verifyEmail': {
            return [
                body('email', 'Bad Email Address').exists().trim().isLength({max: 64}).isEmail().normalizeEmail(),
                body('code', 'Bad Verification Code').exists().trim()
            ];
        }
        case 'verifyPhoneNumber': {
            return [
                body('phoneNumber', 'Phone Number must be valid, and between 0-15 Characters & Must start with Country code. Example: +12023311285').exists().trim().isLength({max: 15}).isMobilePhone(validator.isMobilePhoneLocales, {strictMode: true}),
                body('code', 'Bad Verification Code').exists().trim().isNumeric(),
            ];
        }
    }
};