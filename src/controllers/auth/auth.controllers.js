const AuthService = require('../../services/auth/auth.services');
const VerifyService = require('../../services/auth/verify.services');
const ROLE = require('../../helpers/Role');

exports.postRegister = async(req, res, next) => {
    const { email, username, password } = req.body;

    try {
        // Register User
        const user = await AuthService.registerUser(ROLE.USER, email, username, password);

        // Send Email Verification Code
        VerifyService.sendEmailVerificationCode(user.email);
        
        const userInfo = {type: user.type, email: user.email, username: user.username, createdAt: user.createdAt, verifiedEmail: user.verifiedEmail};
        res.status(201).json({message: 'User successfully registered!', user: userInfo});

    } catch(err) {
        return next(err);
    }
};

exports.postLogin = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        const jwtToken = await AuthService.loginUser(email, password);
        res.cookie('Authorization', `Bearer ${jwtToken}`, {maxAge: new Date().getTime() + 60 * 60 * 1000, httpOnly: true});

        res.status(200).json({message: 'Login Successful', token: jwtToken});
    } catch(err) {
        return next(err);
    }
};

exports.postLogout = (req, res, next) => {
    res.clearCookie('Authorization');
    res.status(200).json({message: 'Successfully Logged Out'});
};

exports.postGetVerifyEmail = async(req, res, next) => {
    const { email } = req.body;

    try {
        // Is user already verified?
        if(await VerifyService.isEmailVerified(email)) {
            return res.status(200).json({message: 'User Email is Already Verified!'});
        }

        // Send Email Verification Code
        await VerifyService.sendEmailVerificationCode(email);

        res.status(200).json({message: 'Verification Email has been Sent!'});
    } catch(err) {
        return next(err);
    }
};

exports.postVerifyEmail = async(req, res, next) => {
    const { email, code } = req.body;

    try {
        // Verify Email
        await VerifyService.verifyEmail(email, code);

        res.status(200).json({message: 'User Email has been verified'});

    } catch(err) {
        return next(err);
    }
};
