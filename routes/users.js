const express = require('express');
const router = express.Router();

// importing user controller page
const userControllers = require('../controllers/users_controller');

router.get('/profile', userControllers.profile);
router.get('/create', userControllers.signUp);
router.get('/create-session', userControllers.signIn);

module.exports = router;