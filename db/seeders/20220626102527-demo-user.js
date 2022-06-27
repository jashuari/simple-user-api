'use strict'
const { faker } = require('@faker-js/faker')

const bcrypt = require('bcryptjs')

const userPassword = faker.internet.userName()
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        username: userPassword,
        password: bcrypt.hashSync(userPassword, 10),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {})
  },
}
