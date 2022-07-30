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

  it('post duplicate user info and respone with 500 and a message showes that duplicate key error', async () => {
    const { text, status } = await request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(tmpUser);
    expect(status).to.be.equal(500);
    expect(text).to.contains('E11000 duplicate key error collection');

    // clean user db
    await User.deleteMany();
  });
});