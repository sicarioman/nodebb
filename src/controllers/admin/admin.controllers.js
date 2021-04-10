const AdminService = require('../../services/admin/admin.services');
const ROLE = require('../../helpers/Role');

exports.getAdmin = async(req, res, next) => {
    try {
        res.status(200).json({message: 'USER IS ADMIN'});
    } catch(err) {
        return next(err);
    }
};
