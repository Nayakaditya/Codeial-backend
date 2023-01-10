const crypto = require('crypto');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

// tell passport to use new strategy for google login
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/google/callback",
    passReqToCallback   : true
  },
  // passing the function for the user
  function(request, accessToken, refreshToken, profile, done) {
    // find a usre
    User.findOne({email : profile.emails[0].value}).exec(function(err, user){
        if(err){
            console.log("Error in google strategy-passport", err);
            return;
        }

        console.log(profile);
        if(user){
            // if found, set the user as req.user
            return done(null, user);
        }else{
            // if not found, create a user and set it as req.user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){
                    console.log("Error in creating user google passport-strategy", err);
                    return;
                }
                return done(null, user);
            })
        }
    })
  }
));
module.exports = passport;