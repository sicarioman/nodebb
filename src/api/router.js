const router = require('express').Router();

const AuthRoutes = require('./auth/auth.routes');

// Auth Routes
router.use('/api', AuthRoutes);

module.exports = router;