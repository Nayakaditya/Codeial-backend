const User = require('../models/user');

module.exports.profile = function (req, res) {
    return res.render('users_profile', {
        title: "Profile Page"
    });
}

// Render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('sign_up', {
        title: "Sign Up"
    })
}

// Render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('sign_in', {
        title: "Sign In"
    })
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
                    return res.redirect('/users/create-session');
                })
            } else {
                return res.redirect('back');
            }
        })
}