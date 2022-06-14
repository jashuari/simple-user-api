const User = require('../models/user.model')
const Like = require('../models/like.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Sequelize = require('sequelize')
const handleError = require('../helpers/utils')
const Op = Sequelize.Op

exports.me = (req, res) => {
  try {
    res.status(200).json({
      messages: 'Information about your account',
      user: req.user,
    })
  } catch (error) {
    handleError(res, error)
  }
}

exports.getUser = async (req, res) => {
  try {
    let user = await User.findOne({ where: { id: req.params.id } })

    const likes = await Like.count({
      where: {
        username: req.params.id,
        like: true,
      },
    })

    const unlikes = await Like.count({
      where: {
        username: req.params.id,
        like: false,
      },
    })

    res.status(200).json({
      username: user.username,
      likes: likes,
      unlikes: unlikes,
    })
  } catch (error) {
    handleError(res, error)
  }
}

exports.updatePassword = async (req, res) => {
  try {
    let current_user = req.user
    if (bcrypt.compareSync(req.body.old_password, current_user.password)) {
      let hashPassword = bcrypt.hashSync(req.body.password, 10)

      await User.update(
        {
          password: hashPassword,
        },
        {
          where: { id: current_user.id },
        }
      )

      let userData = await User.findOne({ where: { id: current_user.id } })
      const token = jwt.sign({ id: userData.id }, process.env.JTW_SECRET_KEY, {
        expiresIn: process.env.JTW_EXPIRES,
      })

      const cookie = {
        expiresIn: new Date(
          Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      }

      res.cookie('Bearer', token, cookie)

      return res.status(200).send({
        messages: 'Password successfully updated',
        data: userData,
        token: token,
      })
    } else {
      return res.status(400).send({
        messages: 'Old password does not matched',
        data: {},
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

exports.like = async (req, res) => {
  try {
    const userLiked = await Like.findOne({ where: { user_id: req.user.id } })

    if (!userLiked) {
      const liked = await Like.create({
        username: req.params.id,
        user_id: req.user.id,
      })

      res.status(200).json({
        status: 'success',
        messages: liked,
      })
    }

    if (userLiked.dataValues.like)
      return res.status(422).json({
        status: 'error',
        messages: 'You already have liked this user',
      })
    else {
      const likedobj = await Like.update(
        {
          like: true,
        },
        {
          where: { user_id: req.user.id },
        }
      )

      res.status(200).json({
        status: 'success',
        messages: likedobj,
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

exports.unLike = async (req, res, next) => {
  try {
    const userUnlked = await Like.findOne({ where: { user_id: req.user.id } })

    if (!userUnlked) {
      const unliked = await Like.create({
        username: req.params.id,
        user_id: req.user.id,
        like: false,
      })

      res.status(200).json({
        status: 'success',
        messages: unliked,
      })
    }
    if (userUnlked.like == false) {
      return res.status(422).json({
        status: 'error',
        messages: 'You already have unliked this user',
      })
    } else {
      const unlikedObj = await Like.update(
        {
          like: false,
        },
        {
          where: { user_id: req.user.id },
        }
      )
      res.status(200).json({
        status: 'success',
        messages: `You unliked this user ${unlikedObj}`,
      })
    }
  } catch (error) {
    handleError(res, error)
  }
}

exports.mostLiked = async (req, res) => {
  Like.belongsTo(User, { foreignKey: 'user_id' })
  await Like.findAll({
    group: [['user.username']],
    attributes: [
      [Like.sequelize.fn('SUM', Like.sequelize.col('like')), 'totalLikesCount'],
    ],
    include: [
      {
        model: User,
        attributes: ['username'],
        required: true,
        on: { id: { [Op.col]: 'Like.username' } },
        duplicating: false,
      },
    ],
    order: [[Like.sequelize.literal('totalLikesCount'), 'DESC']],
    raw: true,
  })
    .then((rst) => {
      res.status(200).json({
        status: 'success',
        messages: rst,
      })
    })
    .catch((err) => {
      handleError(res, error)
    })
}
