const router = require('express').Router();

const isAuth = require('../../middlewares/isAuthenticated');
const isAdmin = require('../../middlewares/isAdmin');
const AdminController = require('../../controllers/admin/admin.controllers');

router.get('/admin', isAuth, isAdmin, AdminController.getAdmin);

module.exports = router;