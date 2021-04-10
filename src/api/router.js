const router = require('express').Router();

const AuthRoutes = require('./auth/auth.routes');
const AdminRoutes = require('./admin/admin.routes');

// Auth Routes
router.use('/api', AuthRoutes);
router.use('/api', AdminRoutes);

module.exports = router;