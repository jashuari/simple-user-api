const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const { faker } = require('@faker-js/faker')

//Assertion Style
const should = chai.should()

const loginDetails = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
}

const badLoginDetails = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
}

const createdID = []

chai.use(chaiHttp)

describe('/POST login', () => {
  it('it should POST signUp', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.user.should.include.keys('username', 'password')
        createdID.push(res.body.user._id)
        verification = res.body.user.verification
        done()
      })
  })
  it('it should GET token', (done) => {
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

describe('/POST login', () => {
  it(`it should NOT POST login after password fail `, (done) => {
    chai
      .request(server)
      .post('/login')
      .send(badLoginDetails)
      .end((err, res) => {
        res.should.have.status(409)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have
          .property('msg')
          .eql('Incorrect Username or Password')
        done()
      })
  })
})

describe('/POST signUp', () => {
  it('it should NOT POST a signUp if username already exists', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(loginDetails)
      .end((err, res) => {
        res.should.have.status(422)
        res.body.should.be.a('object')
        res.body.should.have.all.property('error')
        done()
      })
  })
})
