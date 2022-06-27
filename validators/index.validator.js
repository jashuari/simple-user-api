const register = require('./register.validator')
const login = require('./login.validator')
const updatePassword = require('./update-password.validator')

module.exports = {
  register,
  login,
  updatePassword,
}
