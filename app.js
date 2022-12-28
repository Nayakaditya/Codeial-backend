require('dotenv').config();
// requiring express
const express = require('express');
// importing from routes
const router = require('./routes');
// importing fron config
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

// initailizing express app
const app = express();

// to read forms data
app.use(express.urlencoded());

// to use static files
app.use(express.static('./assets'));


// // extract style and scripts from sub pages into the layout
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express router
app.use('/', router);

// setting up the server
app.listen(port, (err) =>{
    if(err){
        console.log(`Server connection error ! ${err}`);
    }
    console.log(`Server Successfully connected in port: ${port}`);
});