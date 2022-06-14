const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const handleError = require('../helpers/utils')

// User register
exports.signUp = async (req, res) => {
  try {
    const { username, password: Npassword } = req.body
    if (!username || !Npassword)
      return res.status(401).json({
        status: 'error',
        error: 'Please enter your username and password',
      })

    const user = await User.findOne({ where: { username: username } })
    if (user)
      return res
        .status(422)
        .json({ status: 'error', error: 'Username alardy exists' })

    const hashedPassword = await bcrypt.hash(Npassword, 10)
    const createdUser = await User.create({
      username: username,
      password: hashedPassword,
    })

    res.status(201).json({
      messages: 'User created',
      user: createdUser,
    })
  } catch (error) {
    handleError(res, error)
  }
}

// User Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password)
      return res.json({
        status: 'error',
        error: 'Please enter your Username and Password',
      })
    const user = await User.findOne({ where: { username: username } })

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(409).json({
        error: '409',
        msg: 'Incorrect Username or Password',
      })

    const token = jwt.sign({ id: user.id }, process.env.JTW_SECRET_KEY, {
      expiresIn: process.env.JTW_EXPIRES,
    })

    const cookie = {
      expiresIn: new Date(
        Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    }

    res.cookie('Bearer', token, cookie)
    return res.json({
      status: 'success',
      success: 'User has been logged in successfully',
      token: token,
    })
  } catch (error) {
    handleError(res, error)
  }
}
