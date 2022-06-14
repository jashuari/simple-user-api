'use strict'

const Sequelize = require('sequelize')
const sequelize = require('./connection')

module.exports = sequelize.define(
	'like',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: 'id',
		},
		username: Sequelize.STRING,
		user_id: {
			type: Sequelize.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		like: { type: Sequelize.BOOLEAN, defaultValue: true },
	},
	{
		timestamps: false,
		tableName: 'likes',
		underscored: true,
	}
)
