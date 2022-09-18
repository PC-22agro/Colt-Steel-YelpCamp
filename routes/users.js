const express = require('express');
const router = express.Router({ mergeParams: true });
const passport = require('passport');
const User = require('../models/user');
const { route } = require('./campgrounds');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users');

router.route('/register')
    .get(users.signUpForm)
    .post(catchAsync(users.registerUser));

router.route('/login')
    .get(users.userLoginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser);

router.get('/logout', users.logoutUser);

module.exports = router;