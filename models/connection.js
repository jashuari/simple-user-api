'use strict'
const config = require('../config/mysql.json')
const Sequelize = require('sequelize')
const dotenv = require('dotenv').config()

module.exports = new Sequelize(config.DATABASE, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  pool: {
    max: config.POOL.MAX,
    min: config.POOL.MIN,
    acquire: config.POOL.ACQUIRE,
    idle: config.POOL.IDLE,
  },
})
