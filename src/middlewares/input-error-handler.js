const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Input Validation Failed');
        error.statusCode = 422;
        error.errors = errors.array();
        return next(error);
    }
    next();
};