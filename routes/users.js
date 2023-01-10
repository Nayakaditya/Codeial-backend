const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');

// importing user controller page
const userControllers = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, userControllers.profile);
router.get('/signup', userControllers.signUp);
router.get('/signin', userControllers.signIn);
router.post('/create', userControllers.create);
// router.post('/createSession', userControllers.createSession);

router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/users/signin' },
), userControllers.createSession);

router.get('/sign-out', userControllers.destroySession);

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

// this url for recieve the data
router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/users/create-session'
}), userControllers.createSession);
module.exports = router;