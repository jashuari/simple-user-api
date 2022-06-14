'use strict'

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

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
