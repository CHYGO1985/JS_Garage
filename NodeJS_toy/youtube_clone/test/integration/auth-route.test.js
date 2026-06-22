import request from 'supertest';
import { expect } from 'chai';

import app from '../../app.js';
import User from '../../models/user.js';

let userSequence = 0;

const buildUser = (label) => {
  userSequence += 1;

  return {
    name: `${label}-${userSequence}`,
    email: `${label}-${userSequence}@gmail.com`,
    password: '1234',
  };
};

describe('auth routes integration tests', () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  describe('POST /api/auth/signup', () => {
    it('creates a new user', async () => {
      const user = buildUser('signup');

      const response = await request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(user);

      expect(response.status).to.equal(200);
      expect(response.text).to.equal('User has been created!');

      const savedUser = await User.findOne({ name: user.name });
      expect(savedUser).to.not.equal(null);
      expect(savedUser.email).to.equal(user.email);
      expect(savedUser.password).to.not.equal(user.password);
    });

    it('rejects duplicate usernames', async () => {
      const originalUser = buildUser('duplicate-name');
      const duplicateNameUser = {
        ...buildUser('ignored'),
        name: originalUser.name,
      };

      await request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(originalUser);

      const response = await request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(duplicateNameUser);

      expect(response.status).to.equal(500);
      expect(response.text).to.include('duplicate key error');
    });

    it('rejects duplicate emails', async () => {
      const originalUser = buildUser('duplicate-email');
      const duplicateEmailUser = {
        ...buildUser('ignored'),
        email: originalUser.email,
      };

      await request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(originalUser);

      const response = await request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(duplicateEmailUser);

      expect(response.status).to.equal(500);
      expect(response.text).to.include('duplicate key error');
    });
  });

  describe('POST /api/auth/signin', () => {
    let savedUser = null;

    beforeEach(async () => {
      savedUser = buildUser('signin');

      const signupResponse = await request(app)
        .post('/api/auth/signup')
        .set('Accept', 'application/json')
        .send(savedUser);

      expect(signupResponse.status).to.equal(200);
    });

    it('signs in with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send({
          name: savedUser.name,
          password: savedUser.password,
        });

      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(savedUser.name);
      expect(response.body.email).to.equal(savedUser.email);
      expect(response.body).to.not.have.property('password');
      expect(response.headers['set-cookie']).to.have.length.greaterThan(0);
    });

    it('returns 404 for an unknown user', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send({
          name: 'missing-user',
          password: '1234',
        });

      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal('User not found!');
    });

    it('returns 400 for an invalid password', async () => {
      const response = await request(app)
        .post('/api/auth/signin')
        .set('Accept', 'application/json')
        .send({
          name: savedUser.name,
          password: 'wrong-password',
        });

      expect(response.status).to.equal(400);
      expect(response.body.message).to.equal('Username or password is not correct!');
    });
  });
});
