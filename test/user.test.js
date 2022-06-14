const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../index')
const { faker } = require('@faker-js/faker')

//assertions
const should = chai.should()
const expect = chai.expect

const loginDetails = {
  username: 'povio',
  password: '1234',
}

const userDetails = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
}

const mixLoginDetails = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
}
let token = []
chai.use(chaiHttp)
describe('/GET User', () => {
  it('it should POST signUp', (done) => {
    const userLogin = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
    }
    chai
      .request(server)
      .post('/signup')
      .send(userLogin)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.user.should.include.keys('username', 'password')
        token = res.body.token
        done()
      })
  })

  it('it should GET token as user', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(userDetails)
      .end((err, res) => {
        console.log('userDetails signup', userDetails)
        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.user.should.include.keys('username', 'password')
				token = res.body.token
				done()
      })
  })

  it('it should GET the users with Id', (done) => {
    chai
      .request(server)
      .get('/user/1/')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('username')
        res.body.should.have.property('likes')
        done()
      })
  })

  it('it should POST signUp', (done) => {
    chai
      .request(server)
      .post('/signup')
      .send(mixLoginDetails)
      .end((err, res) => {
        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.user.should.include.keys('username', 'password')
        done()
      })
  })

  it('it should GET token as new user', (done) => {
    chai
      .request(server)
      .post('/login')
      .send(mixLoginDetails)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.an('object')
        res.body.should.have.property('token')
        token = res.body.token
        done()
      })
  })
  it('Should ADD a Like to user POST', (done) => {
    chai
      .request(server)
      .post('/user/1/like')
      .set('Cookie', `${token}`)
      .end(function (err, res) {
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.have.all.keys('status', 'messages')
        done()
      })
  })
})

describe('/POST user', () => {
  it('can like user only once,', (done) => {
    const user = {}
    chai
      .request(server)
      .post('/user/1/like')
      .set('Cookie', `${token}`)
      .end((err, res) => {
        console.log('res', res.body)
        res.should.have.status(422)
        res.body.should.be.a('object')
        res.body.should.have
          .property('messages')
          .eql('You already have liked this user')
        done()
      })
  })

  it('can unlike user', (done) => {
    chai
      .request(server)
      .post('/user/1/unlike')
      .set('Cookie', `${token}`)
      .end((err, res) => {
        console.log('res', res.body)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('messages').eql('You unliked this user 1')
        done()
      })
  })
})
