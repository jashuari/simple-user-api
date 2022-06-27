const router = require('express').Router()
const userController = require('../controllers/user.controller')
const middleware = require('../helpers/middleware')
const Validator = require('../helpers/validator')

router.get('/me', middleware.auth, userController.me)
router.put(
  '/me/update-password',
  Validator('updatePassword'),
  middleware.auth,
  userController.updatePassword
)
router.get('/most-liked', userController.mostLiked)

module.exports = router
