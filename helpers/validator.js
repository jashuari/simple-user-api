const createHttpError = require('http-errors')
const joi = require('joi')
const Validators = require('../validators/index.validator')

module.exports = function (validator) {
  //! If validator is not exist, throw err
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`'${validator}' validator is not exist`)

  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body)
      req.body = validated
      next()
    } catch (err) {
      if (err.isJoi) return next(createHttpError(422, { message: err.message }))
      next(createHttpError(500))
    }
  }
}
