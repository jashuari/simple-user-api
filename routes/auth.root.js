const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const Validator = require('../helpers/validator')

router.post('/signup', Validator('login'), authController.signUp)
router.post('/login', Validator('register'), authController.login)

module.exports = router
