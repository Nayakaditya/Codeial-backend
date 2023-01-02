const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                console.log("Error in finding user - passport-local-strategy");
                return done(err);
            }
            if (!user || user.password != password) {
                console.log("Invalid email or password entered");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

// serializing the user to decide which key is to be kept in cookies
// serializeUser() saves the user inside the session which was earlier created by express-session middleware.
passport.serializeUser(function (user, done) {
    done(null, user.id);
});


// deserializing the user from the key in the cookies
// deserializeUser called everytime when a route is hit a backend server
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("Error in finding the user");
            return done(err);
        }
        return done(null, user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // check if the user is signed in then pass on the request on the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // If user is not authenticated
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current singed in user from the session cookies and we are just sending this to locals for the views.
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;