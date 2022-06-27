'use strict'

module.exports = {
	async up(migration, Sequelize) {
		
    await migration
      .createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: { type: Sequelize.STRING, unique: true },
        password: Sequelize.STRING,
      })
      .then(
        await migration.createTable('likes', {
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
        })
      )
  },

  async down(migration, Sequelize) {
    migration.dropTable('likes')
    migration.dropTable('users')
  },
}
