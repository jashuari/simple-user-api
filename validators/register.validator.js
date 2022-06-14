const Joi = require('joi')

const registerSchema = Joi.object({
  username: Joi.string().min(1).required(),
  password: Joi.string().min(4).required(),
})

module.exports = registerSchema
