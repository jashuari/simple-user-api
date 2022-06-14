const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const { faker } = require('@faker-js/faker')
const userHelper = require('../helpers/userHepler')

//assertions
const should = chai.should()
const expect = chai.expect

const loginDetails = {
  username: 'ariPovio',
  password: 'newpw',
}

let token = []
const createdID = []
chai.use(chaiHttp)
describe('/GET User', () => {
  it('it should GET token as user', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.user.should.include.keys('username', 'password')
        console.log('res.body', res.body)
        createdID.push(res.body._id)
        chai
          .request(server)
          .post('/login')
          .send(loginDetails)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.an('object')
            res.body.should.have.property('token')
            token = res.body.token
            done()
          })
      })
  })

  it('it should NOT be able to consume the route since no token was sent', (done) => {
    chai
      .request(server)
      .get('/me')
      .end((err, res) => {
        res.should.have.status(401)
        done()
      })
  })

  it('it should GET currently logged in user information ', (done) => {
    chai
      .request(server)
      .get('/me')
      .set('Cookie', `${token}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.user.should.have.property('username')
        res.body.user.should.have.property('password')
        res.body.user.should.have.property('id')
        done()
      })
  })

  it('it should GET all the users with likes,', (done) => {
    chai
      .request(server)
      .get('/most-liked')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.messages.should.be.a('array')
        done()
      })
  })
})

describe('/PUT change', () => {
  it('it should PUT change password', (done) => {
    chai
      .request(server)
      .put('/me/update-password')
      .set('Cookie', `${token}`)
      .send({
        username: loginDetails.username,
        password: loginDetails.password,
        old_password: loginDetails.password,
      })
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have
          .property('messages')
          .eql('Password successfully updated')
        done()
      })
  })

  after(() => {
    userHelper.findByIdAndRemove((err) => {
      if (err) {
        console.log(err)
      }
    })
  })
})
