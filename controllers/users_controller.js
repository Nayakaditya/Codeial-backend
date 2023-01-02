const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('users_profile', {
        title: "Profile Page"
    });
}

// Render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('sign_up', {
        title: "Sign Up"
    })
}

// Render the sign in page
module.exports.signIn = function (req, res) {
    try{
        if (req.isAuthenticated()) {
            return res.redirect('/users/profile');
        }
    
        return res.render('sign_in', {
            title: "Sign In"
        })
    }catch(error){
        console.log(`Error ${error}`);
    }
}

// Get the sign up data
module.exports.create = function (req, res) {
    let password = req.body.password;
    let confirmPassword = req.body.confirm_password;

    if (password != confirmPassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email },
        function (err, user) {
            if (err) {
                console.log(`Error in finding the user in signing up ${err}`);
                return;
            }
            console.log(user);
            if (!user) {
                User.create(req.body, function (err, user) {
                    if (err) {
                        console.log(`Error in creating a user while signing up ${err}`);
                        return;
                    }
                    return res.redirect('/users/signin');
                })
            } else {
                return res.redirect('back');
            }
        })
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(`Error in destroy session ${err}`);
        }
        return res.redirect('/');
    })
}