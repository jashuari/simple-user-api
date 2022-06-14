'use strict'

const Sequelize = require('sequelize')
const sequelize = require('./connection')

module.exports = sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  }
)
