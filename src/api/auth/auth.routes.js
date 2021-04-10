const router = require('express').Router();

const AuthController = require('../../controllers/auth/auth.controllers');
const inputValidator = require('../../middlewares/input-validator');
const inputErrorHandler = require('../../middlewares/input-error-handler');
const isAuth = require('../../middlewares/isAuthenticated');

router.post('/auth/register', inputValidator.validate('register'), inputErrorHandler, AuthController.postRegister);

router.post('/auth/login', inputValidator.validate('email'), inputErrorHandler, AuthController.postLogin);

router.post('/auth/logout', isAuth, AuthController.postLogout);

router.post('/auth/verify/email', inputValidator.validate('email'), inputErrorHandler, AuthController.postGetVerifyEmail);

router.post('/auth/verification/email', inputValidator.validate('verifyEmail'), inputErrorHandler, AuthController.postVerifyEmail);

module.exports = router;