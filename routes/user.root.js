const router = require('express').Router();
const userController = require('../controllers/user.controller')
const middleware = require('../helpers/middleware');

router.get('/:id', userController.getUser);
router.post('/:id/like', middleware.auth, userController.like)
router.post('/:id/unlike', middleware.auth, userController.unLike)

module.exports = router;