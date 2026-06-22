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

const signupUser = async (user) =>
  request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(user);

const signinUser = async (user) =>
  request(app)
    .post('/api/auth/signin')
    .set('Accept', 'application/json')
    .send({
      name: user.name,
      password: user.password,
    });

const createAuthenticatedUser = async (label) => {
  const user = buildUser(label);
  const signupResponse = await signupUser(user);
  expect(signupResponse.status).to.equal(200);

  const signinResponse = await signinUser(user);
  expect(signinResponse.status).to.equal(200);

  return {
    credentials: user,
    userId: signinResponse.body._id,
    cookie: signinResponse.headers['set-cookie'][0].split(';')[0],
  };
};

describe('user routes integration tests', () => {
  let owner = null;
  let otherUser = null;

  beforeEach(async function beforeEachTest() {
    this.timeout(20000);
    await User.deleteMany();

    owner = await createAuthenticatedUser('owner');
    otherUser = await createAuthenticatedUser('other');
  });

  describe('PUT /api/users/:id', () => {
    it('updates the authenticated user', async () => {
      const response = await request(app)
        .put(`/api/users/${owner.userId}`)
        .set('Accept', 'application/json')
        .set('Cookie', [owner.cookie])
        .send({ name: 'updated-name' });

      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal('updated-name');
      expect(response.body.email).to.equal(owner.credentials.email);
    });

    it('rejects updates for another user', async () => {
      const response = await request(app)
        .put(`/api/users/${otherUser.userId}`)
        .set('Accept', 'application/json')
        .set('Cookie', [owner.cookie])
        .send({ name: 'hijack-name' });

      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal('You can only update your account!');
    });

    it('rejects duplicate usernames', async () => {
      const response = await request(app)
        .put(`/api/users/${owner.userId}`)
        .set('Accept', 'application/json')
        .set('Cookie', [owner.cookie])
        .send({ name: otherUser.credentials.name });

      expect(response.status).to.equal(500);
      expect(response.body.message).to.include('duplicate key error');
    });

    it('requires authentication', async () => {
      const response = await request(app)
        .put(`/api/users/${owner.userId}`)
        .set('Accept', 'application/json')
        .send({ name: 'updated-name' });

      expect(response.status).to.equal(401);
      expect(response.body.message).to.equal('Not authenticated!');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('rejects deletes for another user', async () => {
      const response = await request(app)
        .delete(`/api/users/${otherUser.userId}`)
        .set('Accept', 'application/json')
        .set('Cookie', [owner.cookie]);

      expect(response.status).to.equal(403);
      expect(response.body.message).to.equal('You can only delete your account!');
    });

    it('deletes the authenticated user', async () => {
      const response = await request(app)
        .delete(`/api/users/${owner.userId}`)
        .set('Accept', 'application/json')
        .set('Cookie', [owner.cookie]);

      expect(response.status).to.equal(200);
      expect(response.body).to.equal('User has been deleted.');
      expect(await User.findById(owner.userId)).to.equal(null);
    });
  });

  describe('GET /api/users/find/:id', () => {
    it('returns the requested user', async () => {
      const response = await request(app)
        .get(`/api/users/find/${owner.userId}`)
        .set('Accept', 'application/json');

      expect(response.status).to.equal(200);
      expect(response.body._id).to.equal(owner.userId);
      expect(response.body.name).to.equal(owner.credentials.name);
      expect(response.body.email).to.equal(owner.credentials.email);
    });
  });
});
