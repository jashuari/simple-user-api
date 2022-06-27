'use strict'

const Sequelize = require('sequelize')
const sequelize = require('../connection')

module.exports = sequelize.define(
  'like',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    username: Sequelize.INTEGER,
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    like: { type: Sequelize.INTEGER, defaultValue: 0 },
  },
  {
    timestamps: false,
    tableName: 'likes',
    underscored: true,
  }
)
