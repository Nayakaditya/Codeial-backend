const express = require('express');
const router = express.Router();

// importing controllers 
const homeControllers = require('../controllers/home_controllers');

// and here routing the controllers
router.get('/', homeControllers.home);
router.use('/users', require('./users'))

// exporting router
module.exports = router;

