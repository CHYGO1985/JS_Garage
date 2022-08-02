import request from 'supertest';
import { expect } from 'chai';

import app from '../../app.js';
import User from '../../models/user.js';

let userId = null;
let token = null;

/**
 * signup then signin to get id and cookie for the following tests.
 */
before(async () => {
  const signupUser = {
    name: 'test11',
    email: 'test11@gmail.com',
    password: '1234'
  };

  const signupUser2 = {
    name: 'test22',
    email: 'test22@gmail.com',
    password: '1234'
  };

  // signup user
  const { status } = await request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(signupUser);
  if (status !== 200) throw new Error('Could not signup user for user router tests!');

  const res = await request(app)
    .post('/api/auth/signup')
    .set('Accept', 'application/json')
    .send(signupUser2);
  if (res.status !== 200) throw new Error('Could not signup user for user router tests!');

  const { email, ...signinUser } = signupUser;
  // signin user to get user id and tooken for the user router testing
  const { header, _body } = await request(app)
    .post('/api/auth/signin')
    .set('Accept', 'application/json')
    .send(signinUser);

  const getToken = (tokenString) => {
    const key = 'access_token';
    const access_token = tokenString.split(';')[0];
    const keyPos = access_token.indexOf(key);

    return access_token.substring(keyPos + key.length + 1);
  };

  userId = _body._id;
  token = getToken(header['set-cookie'][0]);
  console.log(userId);
});

after(async () => {
  await User.deleteMany();
});

describe('POST /api/users/:id', () => {
  const userInfoToUpdate = {
    name: "updated"
  };
  it('pass with valid user id and username to update and response 200 with updated username and email', async () => {

    const { _body, status } = await request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .set('Cookie', [`access_token=${token}`])
      .send(userInfoToUpdate);

    expect(status).to.be.equal(200);
    expect(_body.name).to.be.equal('updated');
    expect(_body.email).to.be.equal('test11@gmail.com');
  });

  it('pass the invalid user id and reponse 403 and correspondent message', async () => {

    const invalidUserId = userId + '11';
    const { _body, status } = await request(app)
      .put(`/api/users/${invalidUserId}`)
      .set('Accept', 'application/json')
      .set('Cookie', [`access_token=${token}`])
      .send(userInfoToUpdate);

    expect(status).to.be.equal(403);
    expect(_body.message).to.be.equal('You can only update your account!');
  })

  const repeatedUserName = {
    name: "test22"
  };
  it('pass the valid user id and repeated username and reponse 500 and correspondent message', async () => {

    const { _body, status } = await request(app)
      .put(`/api/users/${userId}`)
      .set('Accept', 'application/json')
      .set('Cookie', [`access_token=${token}`])
      .send(repeatedUserName);

    expect(status).to.be.equal(500);
    expect(_body.message).to.contains(' E11000 duplicate key error collection');
  })
});
