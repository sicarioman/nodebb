const UserService = require('../services/user/user.services');
const ROLE = require('../helpers/Role');

module.exports = async(req, res, next) => {
    const userId = req.userId;

    try {
        if(await UserService.getType(userId) !== ROLE.ADMIN) {
            const error = new Error('Forbidden');
            error.statusCode = 403;
            return next(error);
        }

        next();
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    }
};