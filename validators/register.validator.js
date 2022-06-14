const joi = require('joi')

const registerSchema = joi.object({
  username: joi.string().min(1).required(),
  password: joi.string().min(4).required(),
})

module.exports = registerSchema
