const joi = require('joi')

const registerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(4).required(),
  old_password: joi.string().min(4).required(),
})

module.exports = registerSchema
