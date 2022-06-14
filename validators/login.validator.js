const joi = require('joi')

const loginSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().min(5).required(),
})

module.exports = loginSchema
