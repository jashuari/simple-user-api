'use strict'

const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')
const { Umzug, SequelizeStorage } = require('umzug')
const sequelize = require('./db/connection')

const umzug = new Umzug({
  migrations: { glob: './db/migrations/*.js' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})
;(async () => {
  // Checks migrations and run them if they are not already applied. To keep
  // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
  // will be automatically created (if it doesn't exist already) and parsed.
  await umzug.up().then(() => {
    app.use((err, req, res, next) => {
      // because err.status is undefined
      res.status(404).json({
        error: {
          message: err.message,
        },
      })
    })
  })
})()

app.use(express.json())
app.use(cookieParser())
require('./routes/index')(app)

const PORT = process.env.PORT || 3000
const http = require('http')
const server = http.Server(app)
server.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`)
})

module.exports = server
