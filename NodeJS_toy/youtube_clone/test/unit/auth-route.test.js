import request from 'supertest';
import { expect } from 'chai';

import app from '../../app.js';
import User from '../../models/user.js';

before(function (done) {
  this.timeout(3000);
  setTimeout(done, 2000);
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

    // clean user db
    await User.deleteMany();
  });
});

/**
 * Test /api/auth/signin endpoint
 */
describe('POST signin', () => {
  it('post valid username and password and response with 200 and username and user email', async () => {

  });
});