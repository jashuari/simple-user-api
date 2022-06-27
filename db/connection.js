'use strict'
const config = require('../config/postgresql')
const Sequelize = require('sequelize')
const { col } = require('sequelize/lib/sequelize')
const env = process.env.NODE_ENV || 'development'

let sequelize
if (process.env.NODE_ENV === 'test') {
  console.log('Connect to testing database')
  sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE_TEST,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres',
      pool: {
        max: Number(process.env.POSTGRES_DATABASE_POOL_MAX),
        min: Number(process.env.POSTGRES_DATABASE_POOL_MIN),
        acquire: process.env.POSTGRES_DATABASE_POOL_ACQUIRE,
        idle: process.env.POSTGRES_DATABASE_POOL_IDLE,
      },
    }
  )
} else {
  console.log('Connect to development database')
  sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: 'postgres',
      pool: {
        max: Number(process.env.POSTGRES_DATABASE_POOL_MAX),
        min: Number(process.env.POSTGRES_DATABASE_POOL_MIN),
        acquire: process.env.POSTGRES_DATABASE_POOL_ACQUIRE,
        idle: process.env.POSTGRES_DATABASE_POOL_IDLE,
      },
    }
  )
}

module.exports = sequelize
