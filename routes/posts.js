const express = require('express');
const passport = require('../config/passport-local-strategy');
const router = express.Router();

const postController = require('../controllers/posts_controllers');

router.get('/post_view', postController.postPage);
router.post('/create', passport.checkAuthentication, postController.create);
module.exports = router;