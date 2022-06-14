'use strict'

const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.auth = async function (req, res, next) {
  if (!req.headers.cookie)
    return res
      .status(401)
      .json({ status: 'Access Denied', error: 'Please log in first' })
  try {
    const decoded = jwt.verify(
      req.headers.cookie.replace('Bearer=', ''),
      process.env.JTW_SECRET_KEY
    )

    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    })

    req.user = user
  } catch (error) {
    return res.json({
      status: 'error',
      error: 'Invalid jwt token',
    })
  }
  return next()
}
