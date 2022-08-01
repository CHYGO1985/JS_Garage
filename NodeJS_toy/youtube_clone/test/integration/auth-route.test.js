import request from 'supertest';
import { expect } from 'chai';

import app from '../../app.js';
import User from '../../models/user.js';

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
});

/**
 * Clean user schema in db test
 */
after(async () => {
  await User.deleteMany();
});

/**
 * Test /api/auth/signup endpoint
 */
describe('POST signup', () => {
  const tmpUser = {
    name: 'test11',
    email: 'test11@gmail.com',
    password: '1234'
  };

  it('post a new user and respond with 200 and a msg showes that user has been created', async () => {
    const { text, status } = await request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(tmpUser);
    expect(status).to.be.equal(200);
    expect(text).to.be.equal('User has been created!')
  });

  const dupUserName = {
    name: 'test11',
    email: 'test22@gmail.com',
    password: '1234'
  };
  it('post duplicate user name and respone with 500 and a msg showes that duplicate key error', async () => {
    const { text, status } = await request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(dupUserName);
    expect(status).to.be.equal(500);
    expect(text).to.contains('E11000 duplicate key error collection');
  });

  const dupUserEmail = {
    name: 'test22',
    email: 'test11@gmail.com',
    password: '1234'
  };
  it('post duplicate user email and respone with 500 and a msg showes that duplicate key error', async () => {
    const { text, status } = await request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(dupUserName);
    expect(status).to.be.equal(500);
    expect(text).to.contains('E11000 duplicate key error collection');
  });
});

/**
 * Test /api/auth/signin endpoint
 */
describe('POST signin', () => {
  const signinUser = {
    name: 'test11',
    password: '1234'
  };
  it('post valid username and password and response with 200 and username and user email', async () => {
    const { _body, status } = await request(app)
      .post('/api/auth/signin')
      .set('Accept', 'application/json')
      .send(signinUser);
    expect(status).to.be.equal(200);
    expect(_body.name).to.be.equal('test11');
    expect(_body.email).to.be.equal('test11@gmail.com');
  });

  const signinUser1 = {
    name: 'test22',
    password: '1234'
  };
  it('post invalid username and response with 404 and a msg showes that user is not found', async () => {
    const { _body, status } = await request(app)
      .post('/api/auth/signin')
      .set('Accept', 'application/json')
      .send(signinUser1);
    expect(status).to.be.equal(404);
    expect(_body.message).to.be.equal('User not found!');
  });

  const signinUser2 = {
    name: 'test11',
    password: '1234567'
  };
  it('post invalid password and response with 404 and a msg showes that username or password is not correct', async () => {
    const { _body, status } = await request(app)
      .post('/api/auth/signin')
      .set('Accept', 'application/json')
      .send(signinUser2);
    expect(status).to.be.equal(400);
    expect(_body.message).to.be.equal('Username or password is not correct!');
  });
});
