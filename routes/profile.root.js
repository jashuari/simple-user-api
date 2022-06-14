const router = require('express').Router();
const userController = require('../controllers/user.controller')
const middleware = require('../helpers/middleware');

router.get('/me', middleware.auth, userController.me);
router.put('/me/update-password', middleware.auth, userController.updatePassword);
router.get('/most-liked', userController.mostLiked)

module.exports = router;