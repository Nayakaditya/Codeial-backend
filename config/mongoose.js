const mongoose = require('mongoose');

const URI = process.env.MONGODB_URL;
mongoose.connect(URI,{
    family : 4
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Database connection error"));

db.once('open', ()=>{
    console.log(`Database connection successful : MongoDB`);
});

module.exports = db;