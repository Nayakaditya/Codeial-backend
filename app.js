require('dotenv').config();
const cookieParser = require('cookie-parser');
// requiring express
const express = require('express');
// importing from routes
const router = require('./routes');
// importing fron config
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

//used for cookie session
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

// initailizing express app
const app = express();

// to read forms data
app.use(express.urlencoded());

// use of cookie parser
app.use(cookieParser());

// to use static files
app.use(express.static('./assets'));


// // extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// setting up express session for cookies
app.use(session({
    name : 'codeial',
    secret : "Thisismylittlesecret",
    saveUninitialized : false,
    resave : false,
    store : new MongoStore(
        {
            mongooseConnection : db,
            autoRemove : 'disabled'
        }, function(err){
            console.log(err || "connect-mongo setup ok");
        })
}));

// initializing passport middleware
app.use(passport.initialize());
// using passport session middleware
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// use express router
app.use('/', router);

// setting up the server
app.listen(port, (err) =>{
    if(err){
        console.log(`Server connection error ! ${err}`);
    }
    console.log(`Server Successfully connected in port: ${port}`);
});