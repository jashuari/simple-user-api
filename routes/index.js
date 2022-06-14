const authRoute = require('./auth.root')
const userRoute = require('./user.root')
const profileRoute = require('./profile.root')

module.exports = (app) => {
  app.get('/', function (req, res) {
    res.send({
      messages: 'Hello',
    })
  })

  app.use('/', authRoute)
  app.use('/', profileRoute)
  app.use('/user', userRoute)
}
